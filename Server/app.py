
from datetime import date
from typing import Any

from fastapi import FastAPI, HTTPException, Query, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from psycopg.rows import dict_row
from psycopg.types.json import Json

from Server.db import get_connection


app = FastAPI(title="HRMS API")


# Allow React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EmployeeCreate(BaseModel):
    id: str
    first_name: str
    middle_name: str | None = None
    last_name: str
    dob: date | None = None
    gender: str | None = None
    mobile: str
    personal_email: str | None = None
    official_email: str
    address: str | None = None
    emergency_name: str | None = None
    emergency_mobile: str | None = None

    department: str
    designation: str
    employment_type: str
    category: str
    manager: str
    joining_date: date
    location: str
    shift: str
    status: str
    basic: float
    bank: str | None = None
    photo: str | None = None
    components: dict[str, Any]


@app.get("/")
def root():
    return {"message": "HRMS API is running"}


@app.get("/api/health")
def health_check():
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT current_database();")
                database_name = cur.fetchone()[0]

        return {
            "status": "ok",
            "database": database_name,
        }

    except Exception as error:
        return {
            "status": "error",
            "message": str(error),
        }


@app.post("/api/employees")
def create_employee(employee: EmployeeCreate):
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO employees (
                    id,
                    first_name,
                    middle_name,
                    last_name,
                    dob,
                    gender,
                    mobile,
                    personal_email,
                    official_email,
                    address,
                    emergency_name,
                    emergency_mobile,
                    department,
                    designation,
                    employment_type,
                    category,
                    manager,
                    joining_date,
                    location,
                    shift,
                    status,
                    basic,
                    bank,
                    photo,
                    components
                )
                    VALUES (
                        %s, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s, %s,
                        %s, %s, %s, %s, %s, %s, %s
                    )
                    RETURNING id, dob;
                    """,
                    (
                        employee.id,
                        employee.first_name,
                        employee.middle_name,
                        employee.last_name,
                        employee.dob,
                        employee.gender,
                        employee.mobile,
                        employee.personal_email,
                        employee.official_email,
                        employee.address,
                        employee.emergency_name,
                        employee.emergency_mobile,
                        employee.department,
                        employee.designation,
                        employee.employment_type,
                        employee.category,
                        employee.manager,
                        employee.joining_date,
                        employee.location,
                        employee.shift,
                        employee.status,
                        employee.basic,
                        employee.bank,
                        employee.photo,
                        Json(employee.components),
                    ),
                )

                saved_employee = cur.fetchone()

            conn.commit()

        return {
            "message": "Employee saved successfully",
            "id": saved_employee[0],
            "dob": saved_employee[1],
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error),
        )


@app.get("/api/employees")
def list_employees(
    department: str | None = Query(default=None)
):
    try:
        with get_connection() as conn:
            with conn.cursor(row_factory=dict_row) as cur:

                query = """
                    SELECT
                        id,
                        first_name,
                        middle_name,
                        last_name,
                        dob,
                        gender,
                        mobile,
                        personal_email,
                        official_email,
                        address,
                        emergency_name,
                        emergency_mobile,
                        department,
                        designation,
                        employment_type,
                        category,
                        manager,
                        joining_date,
                        location,
                        shift,
                        status,
                        basic,
                        bank,
                        photo,
                        components
                    FROM employees
                """

                params = []

                # Filter employees by department
                if department and department != "All Departments":
                    query += """
                        WHERE department = %s
                    """

                    params.append(department)

                # Sort employees
                query += """
                    ORDER BY joining_date DESC, id ASC;
                """

                cur.execute(query, params)

                employees = cur.fetchall()

                return employees

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=str(error)
        )
