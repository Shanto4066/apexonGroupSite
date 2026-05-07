---
name: Complete CRUD Plan
overview: Complete end-to-end CRUD implementation blueprint based on the current Branch module pattern (Laravel API + Vue list/modal + permissions + realtime Ably + useListCrud).
todos: []
isProject: false
---

# Complete CRUD Plan

Use this plan to implement any new entity by following the same architecture as Branch CRUD.

Substitute these placeholders before implementation:

- `<EntitySingular>` (example: `Location`)
- `<EntityPlural>` (example: `locations`)
- `<entityFolder>` (example: `location`)
- `<permissionPrefix>` (example: `settings.locations`)
- `<routeName>` (example: `settings.locations`)
- `<channelKey>` (usually same as `<EntityPlural>`)

---

## Phase 0 - Pre-checks

1. Confirm module naming and permission prefix.
2. Confirm final table columns (required/optional, status field, extra fields like code).
3. Confirm menu placement in SideMenu and route path convention.
4. Confirm realtime should be enabled for this module.

---

## Phase 1 - Pre-migration Validation Gate (Mandatory)

Before creating migration, prepare and present the full proposed columns list to user.

Required process:

1. Build a table-spec draft containing all columns with:
  - column name
  - type/length
  - nullable or required
  - default value
  - index/unique
  - foreign key target (if any)
2. Show the complete list to user and ask explicit approval.
3. Continue only when user replies with clear approval (example: "OK", "approved", "go ahead").
4. If user requests changes, update the columns list and repeat this gate.

Example checklist before migration:

- Proposed columns list shown
- User explicitly approved
- Final list frozen for migration

---

## Phase 2 - Database

1. Create migration:
  - Path: `database/migrations/YYYY_MM_DD_HHMMSS_create_<EntityPlural>_table.php`
  - Include:
    - `id`
    - business fields (`name`, etc.)
    - `status_s_id` (`unsignedBigInteger`, FK to `statuses.s_id`) when status is needed
    - `created_by`, `updated_by` (project standard)
    - `timestamps()`
    - `softDeletes()` (project standard)
2. Run migration.
3. Validate schema in DB.

Checklist:

- Soft deletes present
- Audit columns present
- Foreign keys correct
- If any column is both `**UNIQUE**` and a **natural key** users may “recreate” after delete, plan the **restore-on-store** pattern (see Phase 4 subsection)

---

## Phase 3 - Model

1. Create model:
  - Path: `app/Models/<EntitySingular>/<EntitySingular>.php`
2. Apply traits:
  - `AuditTraits`
  - `LogsActivity`
  - `SoftDeletes`
3. Set `$fillable` with allowed fields.
4. Add relations:
  - `creator()` -> `User`
  - `updater()` -> `User`
  - `status()` -> `Status` by `status_s_id` / `s_id`
5. Add activity log options (`logOnly`, `logOnlyDirty`, `dontSubmitEmptyLogs`, `useLogName`).

Checklist:

- Fillable list matches request payload
- Relation names match controller eager-load
- Activity log includes key fields

---

## Phase 4 - API Controller

1. Create controller:
  - Path: `app/Http/Controllers/Api/<EntitySingular>/<EntitySingular>Controller.php`
2. Must extend `BaseController` (project rule).
3. Implement methods:
  - `index(Request $request)`
  - `store(Request $request)`
  - `show(<EntitySingular> $item)`
  - `update(Request $request, <EntitySingular> $item)`
  - `destroy(Request $request, <EntitySingular> $item)`
4. Permissions pattern:
  - menu view: `<permissionPrefix>.menuview`
  - create: `<permissionPrefix>.create`
  - edit: `<permissionPrefix>.edit`
  - delete: `<permissionPrefix>.delete`
  - status change: `<permissionPrefix>.statuschange` (if status exists)
5. API response pattern:
  - success: `$this->successResponse(...)`
  - rely on BaseController permission helpers for unauthorized/forbidden flow.
6. Realtime dispatch after mutations:
  - `BroadcastResourceEvent::dispatch('<channelKey>', 'Created', $payload)`
  - `BroadcastResourceEvent::dispatch('<channelKey>', 'Updated', $payload)`
  - `BroadcastResourceEvent::dispatch('<channelKey>', 'Deleted', ['id' => $id, 'actor_id' => $user->id])`
7. Optional helper endpoint:
  - Add `nextCode()` only if entity requires generated code pattern.

Checklist:

- Index includes creator/status data for table display
- Validation rules complete (create/update/status-only)
- Status-only update path supports statuschange permission
- Realtime payload includes `actor_id`
- If the table has **soft deletes** and a **global `UNIQUE` constraint** on a business column (e.g. `name`), `store` handles recreate-after-delete (see subsection below)

### Soft deletes and `UNIQUE` on the same column (e.g. `name`)

A database `UNIQUE` index applies to **all** rows, including soft-deleted ones (`deleted_at` is still a row). After the user “deletes” a record, creating a **new** row with the same value causes a **duplicate key** error on insert.

**Preferred approach when you want to keep `UNIQUE`:** treat “create again with the same name” as **restore**, not insert.

1. **Validate** duplicates only among **non-deleted** rows, for example:
  - `Rule::unique('<table>', 'name')->whereNull('deleted_at')` on create
  - Same rule with `->ignore($id)` on update
2. `**store` flow:**
  - After validation, if `Model::onlyTrashed()->where('name', $validated['name'])->first()` exists, call `**restore()`** on that row, load relations, broadcast as appropriate, return success (no `INSERT`).
  - Otherwise `create()` as normal.
3. **Caveat:** A **global** unique on `name` means there can never be two rows (one trashed, one active) with the same `name`. Restoring reuses the single row. Renaming an **active** row to a value that still exists only on **another** trashed row can still conflict at the DB until that trashed row is renamed or hard-deleted—document that edge case if it matters for the module.

Do **not** change the schema (e.g. drop `UNIQUE`) for this pattern unless the stakeholder explicitly asks for a different rule (filtered unique, new row per delete, etc.).

---

## Phase 5 - API Routes

1. Update `routes/api.php` under `auth:sanctum` group:
  - `Route::apiResource('<EntityPlural>', <EntitySingular>Controller::class);`
2. Add `use` import for the controller.
3. Add extra route(s) if needed (example: `next-code`).

Checklist:

- Route naming matches frontend API calls
- Extra route defined before `apiResource` when needed

---

## Phase 6 - Frontend Composable

1. Create composable:
  - `resources/js/src/composables/use-<EntityPlural>.js`
2. Wrap `useListCrud('<EntityPlural>')`.
3. Export:
  - list alias (`<EntityPlural>`)
  - `isLoading`
  - `invalidate<EntityPluralPascal>()`
  - `refresh<EntityPluralPascal>()`
  - optional `refetch`

Checklist:

- Entity key in `useListCrud` matches API resource path

---

## Phase 7 - Frontend List View

1. Create list page:
  - `resources/js/src/views/<entityFolder>/index.vue`
2. Follow SFC order rule: `script` -> `template` -> `style`.
3. Integrate:
  - permissions via `usePermissions()`
  - table data via `use-<EntityPlural>.js`
  - realtime via `useRealtimeList('<channelKey>', invalidate..., { actorIdKey: 'actor_id' })`
4. Data table behavior:
  - columns include status/created_by/created_at/actions
  - `@refresh` calls refresh handler
  - create/edit/delete/status-change actions implemented
5. Use reusable components:
  - `DataTable`
  - `ActionButtons`
  - `CreatedInfo`
  - `DeleteConfirmModal`
  - `PermissionRevoked`
6. After create/update/delete/status-change, call invalidate/refresh.

Checklist:

- Permission gates map to `<permissionPrefix>.`*
- Status badges render correctly
- Delete confirm modal wired
- Manual refresh and search clear behaviors work

---

## Phase 8 - Frontend Form Modal

1. Create modal file:
  - `resources/js/src/views/<entityFolder>/<entityFolder>FormModal.vue`
2. Props:
  - `isOpen`
  - `editing<EntitySingular>`
  - optional `initialCode`
  - `submitHandler`
3. Form flow:
  - default form object
  - sync form from editing item on open (`watch`)
  - submit with loading state
  - emit/close/reset on success
4. Fields:
  - create mode fields
  - edit mode optional status radio/select
5. Buttons:
  - use reusable `AppButton` variants (`save`, `update`, `cancel`)

Checklist:

- Payload keys match backend validation fields
- Required fields enforced
- Edit/create mode differences handled

---

## Phase 9 - Router + Menu + Permissions

1. Add route in `resources/js/src/router/index.js`:
  - path: `/settings/<EntityPlural>`
  - name: `<routeName>`
  - component: `../views/<entityFolder>/index.vue`
  - `meta: { auth: true }`
2. Add SideMenu item:
  - `route_name` = `<routeName>`
  - title/icon consistent with settings items
3. Ensure permission seeding/creation includes:
  - `<permissionPrefix>.menuview`
  - `<permissionPrefix>.create`
  - `<permissionPrefix>.edit`
  - `<permissionPrefix>.delete`
  - `<permissionPrefix>.statuschange` (if status used)

Checklist:

- Menu route resolves correctly
- Role assignments grant required actions

---

## Phase 10 - Realtime and Queue Validation

1. Frontend env:
  - `VITE_ABLY_KEY` set
2. Backend env:
  - `services.ably.key` configured
3. Queue worker running for broadcast jobs.
4. Multi-user test:
  - user A changes record
  - user B list updates automatically
  - actor user does not double-refresh (actor skip via `actor_id`)

Checklist:

- Created event refreshes list
- Updated event refreshes list
- Deleted event refreshes list

---

## Phase 11 - UX Rules Compliance (Mandatory)

From workspace rules:

1. On row/action click, turn spinner on first.
2. Do not open modal/form until async preparation completes.
3. Always turn spinner off in `finally`.
4. For new actions, use reusable `runAction` helper.

Also keep controller/model/view structure and BaseController response standards.

Checklist:

- No action without loading state
- No async path without `finally`
- New actions use `runAction`

---

## Phase 12 - QA / Done Criteria

Functional:

- Create works
- Read/list works
- Update works
- Delete (soft delete) works
- Status change works (if enabled)

Security:

- menuview denied user sees blocked access
- create/edit/delete/statuschange permissions enforced API + UI

Data:

- Audit fields populated
- Soft delete verified
- Validation errors return 422 response format

Realtime:

- Cross-user auto refresh works via Ably

UI:

- DataTable render/perf OK
- Modal closes and form resets correctly
- Success/error toasts show meaningful messages

---

## Suggested Execution Order

1. Pre-checks
2. Pre-migration validation gate (show full columns -> get explicit OK)
3. Migration -> migrate
4. Model
5. Controller
6. API routes
7. Composable
8. List view
9. Form modal
10. Router
11. SideMenu + permissions
12. Realtime/queue test
13. Final CRUD + permission QA pass

