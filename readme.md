# Job Portal Application

This is a Job Portal Application that is built using React for the frontend and Node.js with Express for the backend. The application allows users to browse job listings, apply for jobs, and manage their profiles.

# Features

User Features:

- User Registration and Login
- Browse Job Listings
- Search and Filter Jobs
- Apply for Jobs
- View Application Status
- User Profile Management

Recruiter Features:

- Recruiter Login
- Post Job Listings for the Company he/she has been assigned to.
- Manage Job Listings (Create, Update, View)
- View Applicants for Posted Jobs
- Update Application Status

Admin Features:

- Admin Login
- Manage Companies (Create, Update, View, Delete)
- Manage Recruiters (Create, Update, View, Delete)
- Assign Recruiters to Companies

Sample Company:

```json
{
    "name": "Tech Solutions Inc.",
    "description": "A leading technology solutions provider specializing in software development and IT consulting.",
    "industry": "Information Technology",
    "location": "San Francisco, CA",
    "website": "https://www.techsolutions.com",
    "size": "201-500",
    "foundedYear": 2010
}
```

```json
{
    "name": "Innovatech Ltd.",
    "description": "A cutting-edge technology company focused on innovative solutions in AI and machine learning.",
    "industry": "Artificial Intelligence",
    "location": "New York, NY",
    "website": "https://www.innovatech.com",
    "size": "51-200",
    "foundedYear": 2015
}
```

```json
{
    "name": "Green Energy Corp.",
    "description": "A renewable energy company dedicated to providing sustainable energy solutions.",
    "industry": "Renewable Energy",
    "location": "Austin, TX",
    "website": "https://www.greenenergy.com",
    "size": "501-1000",
    "foundedYear": 2008
}
```

```json
{
    "name": "HealthTech Solutions",
    "description": "A healthcare technology company focused on developing innovative medical devices and software.",
    "industry": "Healthcare Technology",
    "location": "Boston, MA",
    "website": "https://www.healthtechsolutions.com",
    "size": "201-500",
    "foundedYear": 2012
}
```

```json
{
    "name": "FinTech Innovations",
    "description": "A financial technology company providing cutting-edge solutions for digital banking and payments.",
    "industry": "Financial Technology",
    "location": "Chicago, IL",
    "website": "https://www.fintechinnovations.com",
    "size": "201-500",
    "foundedYear": 2014
}
```

Job Samples:

```json
{
    "title": "Frontend Developer",
    "description": "We are looking for a skilled Frontend Developer to join our team. The ideal candidate will have experience with React and modern web development practices.",
    "location": "San Francisco, CA",
    "company": "Tech Solutions Inc.",
    "salary": {
        "min": 80000,
        "max": 100000
    },
    "jobType": "Full-time",
    "experienceLevel": "Mid",
    "skills": ["JavaScript", "React", "HTML", "CSS"],
    "applicationDeadline": "2024-06-30",
}
```

```json
{
    "title": "Backend Developer",
    "description": "We are seeking a talented Backend Developer to work on our server-side applications. The candidate should have experience with Node.js and Express.",
    "location": "New York, NY",
    "company": "Innovatech Ltd.",
    "salary": {
        "min": 90000,
        "max": 120000
    },
    "jobType": "Full-time",
    "experienceLevel": "Senior",
    "skills": ["Node.js", "Express", "MongoDB", "REST APIs"],
    "applicationDeadline": "2024-07-15",
}
```

```json
{
    "title": "Data Scientist",
    "description": "We are looking for a Data Scientist to analyze large datasets and develop predictive models. The ideal candidate will have experience with machine learning and statistical analysis.",
    "location": "Austin, TX",
    "company": "Green Energy Corp.",
    "salary": {
        "min": 95000,
        "max": 130000
    },
    "jobType": "Full-time",
    "experienceLevel": "Mid",
    "skills": ["Python", "R", "Machine Learning", "Data Analysis"],
    "applicationDeadline": "2024-08-01",
}
```

```json
{
    "title": "UI/UX Designer",
    "description": "We are seeking a creative UI/UX Designer to design user-friendly interfaces for our web and mobile applications. The candidate should have a strong portfolio showcasing their design skills.",
    "location": "Boston, MA",
    "company": "HealthTech Solutions",
    "salary": {
        "min": 70000,
        "max": 90000
    },
    "jobType": "Full-time",
    "experienceLevel": "Mid",
    "skills": ["Adobe XD", "Figma", "Sketch", "User Research"],
    "applicationDeadline": "2024-07-20",
}
```