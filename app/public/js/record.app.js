var patientRecordsApp = new Vue({
  el: '#patientRecordsApp',
  data: {
    patients: [],
    recordPatient: {},
    filter: {
      sab: ''
    }
  },
  methods: {
    fetchPatients() {
      fetch('api/records/')
      .then(response => response.json())
      .then(json => { patientRecordsApp.patients = json })
    },
    handleSubmit(event) {//add new patients
      fetch('api/records/post.php', {
        method:'POST',
        body: JSON.stringify(this.recordPatient),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then( response => response.json() )
      .then( json => { patientRecordsApp.patients.push( json[0] ) })
      .catch( err => {
        console.error('RECORD POST ERROR:');
        console.error(err);
     });

      this.handleReset();
    },
    handleReset() {//not necessary
      this.recordPatient = {
        firstName: '',
        lastName: '',
        dob: '',
        sexAtBirth: ''
      }
    },
    handleRowClick(patient) {
      patientTriageApp.patient = patient;
    }
  }, // end methods
  created() {
    this.handleReset();
    this.fetchPatients();
  }
});
