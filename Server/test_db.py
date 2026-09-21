from Server.db import get_connection


def test_database():
    try:
        with get_connection() as conn:
            with conn.cursor() as cur:
                cur.execute("SELECT current_database();")
                database_name = cur.fetchone()[0]

                print(f"Connected to database: {database_name}")

    except Exception as error:
        print(f"Database connection failed: {error}")


if __name__ == "__main__":
    test_database()
