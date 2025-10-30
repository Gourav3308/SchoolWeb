export interface TeacherProfile {
  name: string;
  mainSubject: string;
  appointmentNature: string;
  typeOfTeacher: string;
  qualification: string;
  academicQualification: string;
  classTaught: string;
  dateOfBirth?: string;
  dateOfJoiningService?: string;
  dateOfJoiningSchool?: string;
  mobile?: string;
  aadhaarMasked?: string;
  verification?: string;
  photoUrl?: string;
  isPrincipal?: boolean;
}

export const TEACHERS: TeacherProfile[] = [
  {
    name: 'GIRIJANAND SAH',
    mainSubject: 'Biology, English',
    appointmentNature: 'Regular',
    typeOfTeacher: 'Head Teacher',
    qualification: '10 - Diploma in Elementary Education (D.El.Ed)',
    academicQualification: '5 - Post Graduate',
    classTaught: 'Primary and Upper primary',
    dateOfBirth: '02/01/1965',
    dateOfJoiningService: '17/02/1993',
    dateOfJoiningSchool: '27/02/1993',
    mobile: '7903354776',
    aadhaarMasked: 'xxxx-xxxx-6708',
    verification: 'Verified From UIDAI against Name, Gender & DOB',
    photoUrl: 'assets/school/gallery/principals pic.jpg',
    isPrincipal: true
  },
  {
    name: 'JIYAUL HAQUE',
    mainSubject: 'Science',
    appointmentNature: 'Regular',
    typeOfTeacher: 'Teacher',
    qualification: '10 - Diploma in Elementary Education (D.El.Ed)',
    academicQualification: '3 - Higher Secondary',
    classTaught: 'Primary and Upper primary',
    dateOfBirth: '12/04/1973',
    dateOfJoiningService: '18/04/1994',
    dateOfJoiningSchool: '18/04/1994',
    mobile: '6200454841',
    aadhaarMasked: 'xxxx-xxxx-7504',
    verification: 'Verified From UIDAI against Name, Gender & DOB'
  },
  {
    name: 'PUJA KUMARI',
    mainSubject: 'Computer',
    appointmentNature: 'Regular',
    typeOfTeacher: 'Teacher',
    qualification: '5 - Others',
    academicQualification: '4 - Graduate',
    classTaught: 'Primary and Upper primary',
    dateOfBirth: '08/01/2000',
    dateOfJoiningService: '20/08/2020',
    dateOfJoiningSchool: '20/08/2020',
    mobile: '9153863453',
    aadhaarMasked: 'xxxx-xxxx-6149',
    verification: 'Verified From UIDAI against Name, Gender & DOB'
  },
  {
    name: 'PINKI KUMARI',
    mainSubject: '41 - Hindi',
    appointmentNature: 'Regular',
    typeOfTeacher: 'Teacher',
    qualification: '1 - Diploma/basic teacher training',
    academicQualification: '3 - Higher Secondary',
    classTaught: 'Primary and Upper primary',
    dateOfBirth: '15/08/1981',
    dateOfJoiningService: '11/11/2010',
    dateOfJoiningSchool: '11/11/2010',
    mobile: '—',
    aadhaarMasked: 'xxxx-xxxx-8264',
    verification: 'Verified From UIDAI against Name, Gender & DOB'
  },
  {
    name: 'RAJ KUMAR MEHTA',
    mainSubject: '3 - Mathematics',
    appointmentNature: 'Regular',
    typeOfTeacher: 'Teacher',
    qualification: '2 - B.El.Ed',
    academicQualification: '4 - Graduate',
    classTaught: 'Mathematics; Primary and Upper primary',
    dateOfBirth: '12/12/1999',
    dateOfJoiningService: '08/01/2018',
    dateOfJoiningSchool: '08/01/2018',
    mobile: '7061031361',
    aadhaarMasked: 'xxxx-xxxx-0150',
    verification: 'Verified From UIDAI against Name, Gender & DOB'
  },
  {
    name: 'SHILPI KUMARI',
    mainSubject: '8 - Social studies',
    appointmentNature: 'Regular',
    typeOfTeacher: 'Teacher',
    qualification: '10 - D.El.Ed',
    academicQualification: '2 - Secondary',
    classTaught: 'Primary and Upper primary',
    dateOfBirth: '05/02/1996',
    dateOfJoiningService: '28/04/2017',
    dateOfJoiningSchool: '28/04/2017',
    mobile: '6201419724',
    aadhaarMasked: 'xxxx-xxxx-3313',
    verification: 'Verified From UIDAI against Name, Gender & DOB'
  },
  {
    name: 'GHANSHYAM KR SAH',
    mainSubject: '41 - Hindi',
    appointmentNature: 'Regular',
    typeOfTeacher: 'Teacher',
    qualification: '1 - Diploma/basic teacher training (≥2 years)',
    academicQualification: '3 - Higher Secondary',
    classTaught: 'Upper primary only',
    dateOfBirth: '01/01/1982',
    dateOfJoiningService: '01/01/2012',
    dateOfJoiningSchool: '01/01/2012',
    mobile: '9523762668',
    aadhaarMasked: 'xxxx-xxxx-7615',
    verification: 'Verification Failed From UIDAI (mismatch)'
  },
  {
    name: 'KALPNA KUMARI',
    mainSubject: 'English',
    appointmentNature: 'Regular',
    typeOfTeacher: 'Teacher',
    qualification: '10 - Diploma in Elementary Education (D.El.Ed)',
    academicQualification: '4 - Graduate',
    classTaught: 'Primary and Upper primary',
    dateOfBirth: '01/02/1982',
    dateOfJoiningService: '22/12/2002',
    dateOfJoiningSchool: '22/12/2002',
    mobile: '8409470803',
    aadhaarMasked: 'xxxx-xxxx-1654',
    verification: 'Verified From UIDAI against Name, Gender & DOB'
  },
  {
    name: 'VIJAY KUMAR SHARMA',
    mainSubject: 'Moral science',
    appointmentNature: 'Regular',
    typeOfTeacher: 'Teacher',
    qualification: '1 - Diploma/basic teacher training (≥2 years)',
    academicQualification: '3 - Higher Secondary',
    classTaught: 'Primary and Upper primary',
    dateOfBirth: '07/11/1987',
    dateOfJoiningService: '01/01/2012',
    dateOfJoiningSchool: '01/01/2012',
    mobile: '',
    aadhaarMasked: 'xxxx-xxxx-4182',
    verification: 'Verified From UIDAI against Name, Gender & DOB'
  },
  {
    name: 'ARVIND KUMAR',
    mainSubject: '1 - Social science',
    appointmentNature: 'Regular',
    typeOfTeacher: 'Teacher',
    qualification: '4 - Graduate',
    academicQualification: '4 - Graduate',
    classTaught: 'Primary and Upper primary',
    dateOfBirth: '08/01/2002',
    dateOfJoiningService: '20/08/2023',
    dateOfJoiningSchool: '20/08/2023',
    mobile: '9153863453',
    aadhaarMasked: 'xxxx-xxxx-6149',
    verification: 'Verified From UIDAI against Name, Gender & DOB',
    photoUrl: 'assets/school/gallery/Arvind.jpg'
  }
];
