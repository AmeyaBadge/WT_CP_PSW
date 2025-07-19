export const departments = [
  {
    id: 'rural-development',
    name: 'Rural Development',
    description: 'Responsible for implementing rural development schemes and infrastructure projects.',
    detailedDescription: 'The Rural Development Department of Panchayat Samiti Wai oversees the implementation of various central and state government schemes aimed at improving rural infrastructure, livelihood opportunities, and quality of life in villages under its jurisdiction. The department works closely with Gram Panchayats to identify needs and execute development projects.',
    image: '/assets/departments/rural-dev.jpg',
    phone: '02162-234567',
    email: 'rural_dev@wai.gov.in',
    schemesCount: 8,
    hierarchy: [
      {
        title: 'Block Development Officer',
        name: 'Shri. Vikram Joshi',
        children: [
          {
            title: 'Assistant BDO',
            name: 'Smt. Priya Kale',
            children: [
              {
                title: 'Gram Sevak',
                name: 'Shri. Raju Patil'
              },
              {
                title: 'Gram Sevak',
                name: 'Smt. Sunita Jadhav'
              }
            ]
          }
        ]
      }
    ],
    gallery: [
      '/assets/departments/rural-dev-1.jpg',
      '/assets/departments/rural-dev-2.jpg',
      '/assets/departments/rural-dev-3.jpg',
      '/assets/departments/rural-dev-4.jpg'
    ]
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Overseeing primary and secondary education in the Panchayat Samiti area.',
    detailedDescription: 'The Education Department ensures quality education for all children in the Wai Panchayat Samiti area. It manages school infrastructure, teacher training, mid-day meal schemes, and various educational initiatives. The department works to improve literacy rates and educational outcomes across all villages.',
    image: '/assets/departments/education.jpg',
    phone: '02162-234568',
    email: 'education@wai.gov.in',
    schemesCount: 6,
    hierarchy: [
      {
        title: 'Education Officer',
        name: 'Dr. Meera Kulkarni',
        children: [
          {
            title: 'Assistant Education Officer',
            name: 'Shri. Arun Patil',
            children: [
              {
                title: 'School Inspector',
                name: 'Smt. Kavita Sharma'
              }
            ]
          }
        ]
      }
    ],
    gallery: [
      '/assets/departments/education-1.jpg',
      '/assets/departments/education-2.jpg'
    ]
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Providing healthcare services and implementing health schemes.',
    detailedDescription: 'The Health Department focuses on providing accessible healthcare services to rural populations. It manages primary health centers, sub-centers, and mobile medical units. The department also implements various health schemes, vaccination programs, and health awareness campaigns.',
    image: '/assets/departments/health.jpg',
    phone: '02162-234569',
    email: 'health@wai.gov.in',
    schemesCount: 5,
    hierarchy: [
      {
        title: 'Medical Officer',
        name: 'Dr. Rajesh Deshmukh',
        children: [
          {
            title: 'Staff Nurse',
            name: 'Smt. Shital Pawar'
          },
          {
            title: 'ASHA Worker',
            name: 'Smt. Rukhmini Bhosale'
          }
        ]
      }
    ],
    gallery: [
      '/assets/departments/health-1.jpg',
      '/assets/departments/health-2.jpg'
    ]
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    description: 'Supporting farmers and implementing agricultural development programs.',
    detailedDescription: 'The Agriculture Department provides support to farmers through various schemes, training programs, and modern farming techniques. It focuses on crop improvement, soil health management, irrigation facilities, and connecting farmers with markets for better income generation.',
    image: '/assets/departments/agriculture.jpg',
    phone: '02162-234570',
    email: 'agriculture@wai.gov.in',
    schemesCount: 7,
    hierarchy: [
      {
        title: 'Agriculture Officer',
        name: 'Shri. Santosh Jadhav',
        children: [
          {
            title: 'Agriculture Assistant',
            name: 'Shri. Mahesh Pawar'
          }
        ]
      }
    ],
    gallery: []
  }
];
