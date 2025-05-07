document.addEventListener('DOMContentLoaded', function() {
  const report = document.getElementById('reports');
  report.addEventListener('click', function(event) {
      event.preventDefault();
      window.location.href = '/report';
  });

  fetch('/api/jobs') 
      .then(response => response.json())  
      .then(data => {
          const jobsTable = document.getElementById('jobsTable').getElementsByTagName('tbody')[0];
          data.forEach(job => {
              const row = jobsTable.insertRow();
              row.insertCell(0).textContent = job[0];  // Job ID
              row.insertCell(1).textContent = job[1];  // Job Role
              row.insertCell(2).textContent = job[2];  // Company
              row.insertCell(3).textContent = job[3];  // Package

              // View Button - index 4
              const descriptionCell = row.insertCell(4);
              descriptionCell.classList.add('description'); 
              const viewButton = document.createElement('button');
              viewButton.classList.add('view-btn');
              viewButton.textContent = 'View'; 
              viewButton.onclick = () => {
                  window.location.href = `/recruiter/job/${job[0]}`;
              };
              descriptionCell.appendChild(viewButton);

              // Delete Button - index 5
              const deleteCell = row.insertCell(5);
              deleteCell.classList.add('description');
              const deleteButton = document.createElement('button');
              deleteButton.classList.add('delete-btn');
              deleteButton.textContent = 'Delete';
              deleteButton.style.marginLeft = '10px';
              deleteButton.onclick = () => {
                  if (confirm('Are you sure you want to delete this job?')) {
                      fetch(`/api/job_details/${job[0]}`, {
                          method: 'DELETE'
                      }).then(res => {
                          if (res.ok) {
                              row.remove();  // Remove the job row from the table if successful
                          } else {
                              alert('Failed to delete job.');
                          }
                      });
                  }
              };
              deleteCell.appendChild(deleteButton);
          });
      });

  // Create Job Button
  document.getElementById('create-job-btn').addEventListener('click', function() {
      window.location.href = '/create_job_page'; // Redirect to the job creation page
  });

  // Logout Button
  document.getElementById('logout-btn').addEventListener('click', function() { 
      window.location.href = '/';  // Redirect to homepage or login page
  }); 
});

