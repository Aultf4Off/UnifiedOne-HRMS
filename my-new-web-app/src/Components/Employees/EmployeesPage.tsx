
import { useHRMS } from "../../context/useHRMS";
import type { Employee } from "../../types/employee";
import EmployeeViewModal from "./EmployeeViewModal";
import EmployeeFormModal from "./EmployeeFormModal";
import {
  useEffect,
  useState,
  type FC,
} from "react";
import { getEmployees } from "../../services/employeeService";


// ==========================================
// STATUS BADGE CLASS
// ==========================================

function getStatusBadgeClass(status: string): string {
  switch (status) {
    case "Active":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Inactive":
    case "Separated":
      return "bg-rose-50 text-rose-700 border-rose-200";

    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}


// ==========================================
// EMPLOYEES PAGE
// ==========================================

export const EmployeesPage: FC = () => {

  // HRMS context
  const {
    documents,
    masters,
    searchQuery,
    setSearchQuery,
    saveEmployee,
  } = useHRMS();


  // ==========================================
  // STATES
  // ==========================================

  // Employees received from FastAPI / PostgreSQL
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [deptFilter, setDeptFilter] = useState<string>(
    "All Departments"
  );

  const [statusFilter, setStatusFilter] = useState<string>(
    "All Statuses"
  );

  const [viewingEmployee, setViewingEmployee] =
    useState<Employee | null>(null);

  const [isFormOpen, setIsFormOpen] =
    useState<boolean>(false);

  const [editingEmployee, setEditingEmployee] =
    useState<Employee | null>(null);


  // ==========================================
  // LOAD EMPLOYEES FROM FASTAPI / POSTGRESQL
  // ==========================================

  useEffect(() => {

    async function loadEmployees() {
      try {

        const data = await getEmployees(
          deptFilter,
          statusFilter,
          searchQuery
        );

        setEmployees(data);

      } catch (error) {

        console.error(
          "Error loading employees from database:",
          error
        );

      }
    }

    loadEmployees();

  }, [deptFilter, statusFilter, searchQuery]);


  // ==========================================
  // NO JAVASCRIPT FILTERING
  // ==========================================

  // Filtering is handled by FastAPI/PostgreSQL.
  // React displays the records returned by the API.
  const filteredEmployees: Employee[] = employees;


  // ==========================================
  // OPEN ADD EMPLOYEE MODAL
  // ==========================================

  const handleOpenAddModal = () => {

    setEditingEmployee(null);
    setIsFormOpen(true);

  };


  // ==========================================
  // OPEN EDIT EMPLOYEE MODAL
  // ==========================================

  const handleOpenEditModal = (emp: Employee) => {

    setEditingEmployee(emp);
    setIsFormOpen(true);

  };


  // ==========================================
  // RETURN UI
  // ==========================================

  return (

    <div className="w-full max-w-none px-6 lg:px-8 py-6 space-y-5">

      {/* ==========================================
          PAGE HEADER
      ========================================== */}

      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

        <div>

          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Employees
          </h1>

          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Central employee master. All attendance, leave, payroll,
            ESS, reports and login mappings reference Employee ID.
          </p>

        </div>


        <button
          type="button"
          className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer shadow-xs shrink-0 self-start"
          onClick={handleOpenAddModal}
        >
          + Add Employee
        </button>

      </div>


      {/* ==========================================
          TOOLBAR FILTERS
      ========================================== */}

      <div className="flex flex-wrap items-center gap-2.5">

        {/* Department Filter */}

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          aria-label="Filter by department"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors shadow-2xs"
        >

          <option value="All Departments">
            All Departments
          </option>

          {masters.departments.map((d) => (

            <option key={d.id} value={d.name}>
              {d.name}
            </option>

          ))}

        </select>


        {/* Status Filter */}

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          aria-label="Filter by status"
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors shadow-2xs"
        >

          <option value="All Statuses">
            All Statuses
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>

          <option value="Separated">
            Separated
          </option>

        </select>


        {/* Search Input */}

        <input
          type="search"
          placeholder="Search by name, ID, email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search employees"
          className="w-full sm:w-64 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-colors shadow-2xs"
        />


        <div className="flex-1" />


        {/* Employee Count */}

        <div className="text-xs font-semibold text-slate-500 px-1">

          {filteredEmployees.length}{" "}
          {filteredEmployees.length === 1
            ? "record"
            : "records"}

        </div>

      </div>


      {/* ==========================================
          EMPLOYEE TABLE
      ========================================== */}

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">

        <table className="w-full text-left text-xs min-w-[760px]">

          <thead>

            <tr className="bg-slate-50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">

              <th className="py-3 px-4">
                Employee
              </th>

              <th className="py-3 px-4">
                Department / Designation
              </th>

              <th className="py-3 px-4">
                Location
              </th>

              <th className="py-3 px-4">
                Shift
              </th>

              <th className="py-3 px-4">
                Employment
              </th>

              <th className="py-3 px-4">
                Status
              </th>

              <th className="py-3 px-4 text-right">
                Actions
              </th>

            </tr>

          </thead>


          <tbody className="divide-y divide-slate-100">

            {filteredEmployees.length > 0 ? (

              filteredEmployees.map((emp: Employee) => (

                <tr
                  key={emp.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >

                  {/* Employee Details */}

                  <td className="py-3 px-4">

                    <div className="flex items-center gap-3">

                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold grid place-items-center shrink-0">

                        {emp.photo ||
                          (
                            (emp.first?.[0] || "") +
                            (emp.last?.[0] || "")
                          ).toUpperCase()}

                      </div>


                      <div className="min-w-0">

                        <strong className="text-xs font-bold text-slate-900 block truncate">

                          {emp.first} {emp.last}

                        </strong>


                        <small className="text-[11px] text-slate-500 block truncate">

                          {emp.id} · {emp.officialEmail}

                        </small>

                      </div>

                    </div>

                  </td>


                  {/* Department and Designation */}

                  <td className="py-3 px-4">

                    <strong className="font-semibold text-slate-900 block">

                      {emp.department}

                    </strong>

                    <span className="text-[11px] text-slate-500 block">

                      {emp.designation}

                    </span>

                  </td>


                  {/* Location */}

                  <td className="py-3 px-4 text-slate-700 font-medium">

                    {emp.location}

                  </td>


                  {/* Shift */}

                  <td className="py-3 px-4 text-slate-700 font-medium">

                    {emp.shift}

                  </td>


                  {/* Employment */}

                  <td className="py-3 px-4">

                    <strong className="font-semibold text-slate-900 block">

                      {emp.employmentType}

                    </strong>

                    <span className="text-[11px] text-slate-500 block">

                      {emp.category}

                    </span>

                  </td>


                  {/* Status */}

                  <td className="py-3 px-4">

                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusBadgeClass(
                        emp.status
                      )}`}
                    >

                      {emp.status}

                    </span>

                  </td>


                  {/* Actions */}

                  <td className="py-3 px-4 text-right">

                    <div className="inline-flex gap-1.5">

                      {/* View Button */}

                      <button
                        type="button"
                        onClick={() => setViewingEmployee(emp)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
                      >

                        View

                      </button>


                      {/* Edit Button */}

                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(emp)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-100 transition-colors cursor-pointer shadow-2xs"
                      >

                        Edit

                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={7}
                  className="p-12 text-center text-xs text-slate-400"
                >

                  No matching employee records found.

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>


      {/* ==========================================
          VIEW EMPLOYEE MODAL
      ========================================== */}

      {viewingEmployee && (

        <EmployeeViewModal
          employee={viewingEmployee}
          documents={documents}
          onClose={() => setViewingEmployee(null)}
          onEdit={(emp) => handleOpenEditModal(emp)}
        />

      )}


      {/* ==========================================
          ADD / EDIT EMPLOYEE MODAL
      ========================================== */}

      {isFormOpen && (

        <EmployeeFormModal
          key={editingEmployee?.id || "new"}
          isOpen={isFormOpen}
          employeeToEdit={editingEmployee}
          existingEmployees={employees}
          masters={masters}

          onClose={() => {

            setIsFormOpen(false);
            setEditingEmployee(null);

          }}

          onSave={async (data, isEdit) => {

            const res = await saveEmployee(data, isEdit);

            if (
              res.success &&
              viewingEmployee &&
              viewingEmployee.id === data.id
            ) {

              setViewingEmployee(data);

            }

            return res;

          }}

        />

      )}

    </div>

  );

};


// ==========================================
// DEFAULT EXPORT
// ==========================================

export default EmployeesPage;