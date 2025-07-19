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
    gallery: [
      '/assets/departments/rural-dev-1.jpg',
      '/assets/departments/rural-dev-2.jpg',
      '/assets/departments/rural-dev-3.jpg',
      '/assets/departments/rural-dev-4.jpg',
    ],
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
                title: 'Extension Officer',
                name: 'Smt. Sunita Jadhav'
              }
            ]
          },
          {
            title: 'Junior Engineer',
            name: 'Shri. Prakash Bhosale',
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 'education',
    name: 'Education',
    description: 'Manages primary and secondary education initiatives and school infrastructure.',
    detailedDescription: 'The Education Department focuses on improving educational infrastructure, implementing government schemes for students, managing teacher recruitment and training, and ensuring quality education delivery in schools under the Panchayat Samiti jurisdiction.',
    image: '/assets/departments/education.jpg',
    phone: '02162-234568',
    email: 'education@wai.gov.in',
    schemesCount: 6,
    gallery: [
      '/assets/departments/education-1.jpg',
      '/assets/departments/education-2.jpg',
    ],
    hierarchy: [
      {
        title: 'Education Officer',
        name: 'Dr. Meera Sharma',
        children: [
          {
            title: 'Assistant Education Officer',
            name: 'Shri. Anil Kumar',
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 'health',
    name: 'Health',
    description: 'Oversees public health initiatives, healthcare facilities, and wellness programs.',
    detailedDescription: 'The Health Department manages primary healthcare centers, implements health schemes, conducts health camps, manages vaccination programs, and ensures healthcare delivery to rural populations under Panchayat Samiti Wai.',
    image: '/assets/departments/health.jpg',
    phone: '02162-234569',
    email: 'health@wai.gov.in',
    schemesCount: 5,
    gallery: [],
    hierarchy: [
      {
        title: 'Medical Officer',
        name: 'Dr. Rajesh Patil',
        children: [
          {
            title: 'Health Inspector',
            name: 'Smt. Kavita Desai',
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 'water-resources',
    name: 'Water Resources',
    description: 'Manages water supply, irrigation projects, and water conservation initiatives.',
    detailedDescription: 'The Water Resources Department handles water supply schemes, irrigation projects, watershed management, and water conservation programs to ensure sustainable water management for the region.',
    image: '/assets/departments/water.jpg',
    phone: '02162-234570',
    email: 'water@wai.gov.in',
    schemesCount: 4,
    gallery: [],
    hierarchy: [
      {
        title: 'Water Resources Officer',
        name: 'Shri. Sachin Jadhav',
        children: []
      }
    ]
  },
  {
    id: 'agriculture',
    name: 'Agriculture',
    description: 'Supports farmers with modern techniques, schemes, and agricultural development.',
    detailedDescription: 'The Agriculture Department provides support to farmers through various schemes, modern farming techniques, crop insurance, soil testing, and agricultural extension services to improve farm productivity and farmer income.',
    image: '/assets/departments/agriculture.jpg',
    phone: '02162-234571',
    email: 'agriculture@wai.gov.in',
    schemesCount: 7,
    gallery: [],
    hierarchy: [
      {
        title: 'Agriculture Officer',
        name: 'Dr. Suresh Pawar',
        children: [
          {
            title: 'Agriculture Extension Officer',
            name: 'Shri. Mahesh Bhosale',
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 'womens-child-development',
    name: 'Women & Child Development',
    description: 'Implements schemes for women empowerment and child welfare programs.',
    detailedDescription: 'The Women & Child Development Department focuses on women empowerment programs, child nutrition schemes, skill development for women, self-help group formation, and ensuring welfare of women and children in the region.',
    image: '/assets/departments/women-child.jpg',
    phone: '02162-234572',
    email: 'wcd@wai.gov.in',
    schemesCount: 6,
    gallery: [],
    hierarchy: [
      {
        title: 'Child Development Project Officer',
        name: 'Smt. Lata Jadhav',
        children: []
      }
    ]
  }
];
