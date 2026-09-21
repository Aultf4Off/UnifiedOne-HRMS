
import type { Employee } from "../types/employee";

const API_URL = "https://unifiedone-hrms-1.onrender.com";

// ==========================================
// GET EMPLOYEES (WITH FILTERS)
// ==========================================

export async function getEmployees(
  department?: string,
  status?: string,
  search?: string
): Promise<Employee[]> {
  const params = new URLSearchParams();

  // Department filter
  if (department && department !== "All Departments") {
    params.append("department", department);
  }

  // Status filter
  if (status && status !== "All Statuses") {
    params.append("status", status);
  }

  // Search filter
  if (search?.trim()) {
    params.append("search", search.trim());
  }

  const queryString = params.toString();

  const response = await fetch(
    `${API_URL}/api/employees${
      queryString ? `?${queryString}` : ""
    }`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Failed to load employees");
  }

  return data.map(
    (employee: Record<string, unknown>): Employee => ({
      id: String(employee.id),

      first: String(employee.first_name),

      middle: String(employee.middle_name || ""),

      last: String(employee.last_name),

      dob: employee.dob ? String(employee.dob) : "",

      gender: employee.gender ? String(employee.gender) : "",

      mobile: employee.mobile
        ? String(employee.mobile)
        : "",

      personalEmail: employee.personal_email
        ? String(employee.personal_email)
        : "",

      officialEmail: employee.official_email
        ? String(employee.official_email)
        : "",

      address: employee.address
        ? String(employee.address)
        : "",

      emergencyName: employee.emergency_name
        ? String(employee.emergency_name)
        : "",

      emergencyMobile: employee.emergency_mobile
        ? String(employee.emergency_mobile)
        : "",

      department: String(employee.department || ""),

      designation: String(employee.designation || ""),

      employmentType: String(employee.employment_type || ""),

      category: String(employee.category || ""),

      manager: String(employee.manager || ""),

      joining: String(employee.joining_date || ""),

      location: String(employee.location || ""),

      shift: String(employee.shift || ""),

      status: String(employee.status || ""),

      basic: Number(employee.basic || 0),

      bank: employee.bank
        ? String(employee.bank)
        : "",

      photo: employee.photo
        ? String(employee.photo)
        : "",

      components:
        (employee.components as Employee["components"]) || {
          HRA: 0,
          Conveyance: 0,
          PF: 0,
        },
    })
  );
}


// ==========================================
// CREATE EMPLOYEE
// ==========================================

export async function createEmployee(
  employee: Employee
) {
  const response = await fetch(
    `${API_URL}/api/employees`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id: employee.id,

        first_name: employee.first,

        middle_name: employee.middle || null,

        last_name: employee.last,

        dob: employee.dob,

        gender: employee.gender,

        mobile: employee.mobile || null,

        personal_email: employee.personalEmail || null,

        official_email: employee.officialEmail,

        address: employee.address,

        emergency_name: employee.emergencyName || null,

        emergency_mobile: employee.emergencyMobile || null,

        department: employee.department,

        designation: employee.designation,

        employment_type: employee.employmentType,

        category: employee.category,

        manager: employee.manager,

        joining_date: employee.joining,

        location: employee.location,

        shift: employee.shift,

        status: employee.status,

        basic: employee.basic,

        bank: employee.bank || null,

        photo: employee.photo || null,

        components: employee.components,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.detail || "Failed to save employee"
    );
  }

  return data;
}