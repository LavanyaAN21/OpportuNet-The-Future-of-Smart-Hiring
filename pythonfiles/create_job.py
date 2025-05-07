import sqlite3
def add_job(job_role, company, package, job_description):
    conn2 = sqlite3.connect('db/hireme.db')
    cursor2 = conn2.cursor()
    cursor2.execute('''INSERT INTO jobs (job_role, company, package, job_description)VALUES (?, ?, ?, ?)''', (job_role, company, package, job_description))
    conn2.commit()
    conn2.close()
    

def delete_job_by_id(job_id):
    try:
        conn = sqlite3.connect('db/hireme.db')
        cursor = conn.cursor()
        cursor.execute("DELETE FROM jobs WHERE id = ?", (job_id,))
        conn.commit()

        # Check if the deletion was successful
        if cursor.rowcount > 0:
            return True  # Job was successfully deleted
        else:
            return False  # No job was deleted (job ID might not exist)
    except Exception as e:
        print(f"Error deleting job: {e}")
        return False
    finally:
        conn.close()

