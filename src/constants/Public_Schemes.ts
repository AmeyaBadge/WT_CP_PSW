export const schemes = [
  {
    id: 'pm-awas-yojana',
    title: 'Pradhan Mantri Awas Yojana',
    titleMarathi: 'प्रधानमंत्री आवास योजना',
    type: 'central',
    department: 'Rural Development',
    departmentMarathi: 'ग्रामीण विकास',
    description: 'Housing for all by 2024 with pucca house to all eligible beneficiaries.',
    descriptionMarathi: 'पात्र लाभार्थ्यांना २०२४ पर्यंत पक्के घर देण्याची योजना.',
    detailedDescription: 'The Pradhan Mantri Awas Yojana (PMAY) is a flagship scheme launched by the Government of India to provide affordable housing to the urban and rural poor. Under this scheme, beneficiaries are provided financial assistance to construct or enhance their houses with basic amenities.',
    image: '/assets/schemes/pmay.jpg',
    eligibility: 'Families without pucca house and below poverty line',
    deadline: '2024-12-31',
    benefits: [
      'Financial assistance up to ₹1.2 lakh for house construction',
      'Interest subsidy on home loans',
      'Priority to women, SC/ST, and minorities'
    ],
    benefitsMarathi: [
      'घर बांधणीसाठी ₹१.२ लाख पर्यंत आर्थिक मदत',
      'गृहकर्जावर व्याज अनुदान',
      'महिला, अनुसूचित जाती/जमाती आणि अल्पसंख्याक समुदायांना प्राधान्य'
    ],
    applicationSteps: [
      'Visit the official PMAY website or Gram Panchayat office',
      'Fill the application form with required details',
      'Attach necessary documents',
      'Submit to concerned authority'
    ],
    applicationStepsMarathi: [
      'अधिकृत पीएमएवाय वेबसाइट किंवा ग्रामपंचायत कार्यालय भेट द्या',
      'आवश्यक तपशीलांसह अर्ज भरा',
      'आवश्यक कागदपत्रे जोडा',
      'संबंधित अधिकाऱ्यांकडे सादर करा'
    ],
    documentsRequired: [
      'Income certificate',
      'Caste certificate (if applicable)',
      'Aadhaar card',
      'Bank account details',
      'Land documents'
    ],
    documentsRequiredMarathi: [
      'उत्पन्न प्रमाणपत्र',
      'जाती प्रमाणपत्र (लागू असल्यास)',
      'आधार कार्ड',
      'बँक खाते तपशील',
      'जमीन कागदपत्र'
    ],
    applyLink: 'https://pmayg.nic.in',
    faqs: [
      {
        question: 'Who is eligible for PMAY?',
        questionMarathi: 'पीएमएवायसाठी कोण पात्र आहे?',
        answer: 'Families who do not own a pucca house and are below the poverty line are eligible.',
        answerMarathi: 'ज्यांच्याकडे पक्के घर नाही आणि दारिद्र्यरेषेखालील कुटुंबे पात्र आहेत.'
      },
      {
        question: 'What is the financial assistance provided?',
        questionMarathi: 'किती आर्थिक मदत दिली जाते?',
        answer: 'Up to ₹1.2 lakh is provided for house construction in rural areas.',
        answerMarathi: 'ग्रामीण भागात घर बांधणीसाठी ₹१.२ लाख पर्यंत मदत दिली जाते.'
      }
    ]
  },
  {
    id: 'mgnrega',
    title: 'Mahatma Gandhi National Rural Employment Guarantee Act',
    titleMarathi: 'महात्मा गांधी राष्ट्रीय ग्रामीण रोजगार हमी अधिनियम',
    type: 'central',
    department: 'Rural Development',
    departmentMarathi: 'ग्रामीण विकास',
    description: 'Guaranteed 100 days of wage employment to rural households.',
    descriptionMarathi: 'ग्रामीण कुटुंबांना १०० दिवस मजुरीची हमी.',
    detailedDescription: 'MGNREGA is one of the largest work guarantee programmes in the world. It aims to enhance livelihood security in rural areas by providing at least 100 days of guaranteed wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.',
    image: '/assets/schemes/mgnrega.jpg',
    eligibility: 'Adult members of rural households willing to do unskilled manual work',
    deadline: null,
    benefits: [
      '100 days guaranteed employment per household per year',
      'Minimum wages as per state rates',
      'Work within 5 km radius of residence',
      'Women participation of at least 33%'
    ],
    benefitsMarathi: [
      'दरवर्षी प्रति कुटुंब १०० दिवस रोजगाराची हमी',
      'राज्य दरानुसार किमान मजुरी',
      'निवासस्थानाच्या ५ किमी त्रिज्येत काम',
      'किमान ३३% महिला सहभाग'
    ],
    applicationSteps: [
      'Apply for job card at Gram Panchayat',
      'Submit application for work',
      'Get work within 15 days',
      'Complete the assigned work'
    ],
    applicationStepsMarathi: [
      'ग्रामपंचायतीत जॉब कार्डसाठी अर्ज करा',
      'कामासाठी अर्ज सादर करा',
      '१५ दिवसांत काम मिळवा',
      'नियुक्त काम पूर्ण करा'
    ],
    documentsRequired: [
      'Aadhaar card',
      'Bank account details',
      'Address proof',
      'Photograph'
    ],
    documentsRequiredMarathi: [
      'आधार कार्ड',
      'बँक खाते तपशील',
      'पत्ता पुरावा',
      'छायाचित्र'
    ],
    applyLink: 'https://nrega.nic.in',
    faqs: [
      {
        question: 'How many days of work are guaranteed?',
        questionMarathi: 'किती दिवसांच्या कामाची हमी आहे?',
        answer: '100 days of work per household per financial year.',
        answerMarathi: 'प्रति आर्थिक वर्षी प्रति कुटुंब १०० दिवसांचे काम.'
      }
    ]
  },
  {
    id: 'pm-kisan',
    title: 'PM-KISAN Samman Nidhi',
    titleMarathi: 'पीएम-किसान सन्मान निधी',
    type: 'central',
    department: 'Agriculture',
    departmentMarathi: 'कृषी',
    description: 'Income support to small and marginal farmers.',
    descriptionMarathi: 'लहान आणि सीमांत शेतकऱ्यांना उत्पन्न सहाय्य.',
    detailedDescription: 'PM-KISAN is a Central Sector Scheme launched in 2019 to supplement the financial needs of land holding farmers, subject to exclusions. Under the scheme, financial benefit of ₹6000 per year is transferred in three equal installments into the bank accounts of farmer families.',
    image: '/assets/schemes/pm-kisan.jpg',
    eligibility: 'Small and marginal farmers with cultivable land',
    deadline: null,
    benefits: [
      '₹6000 per year in three installments',
      'Direct benefit transfer to bank account',
      'No limit on family size'
    ],
    benefitsMarathi: [
      'तीन हप्त्यांत दरवर्षी ₹६०००',
      'बँक खात्यात थेट लाभ हस्तांतरण',
      'कुटुंबाच्या आकारावर मर्यादा नाही'
    ],
    applicationSteps: [
      'Visit PM-KISAN portal',
      'Register with Aadhaar number',
      'Fill farmer details',
      'Submit land records'
    ],
    applicationStepsMarathi: [
      'पीएम-किसान पोर्टलला भेट द्या',
      'आधार क्रमांकाने नोंदणी करा',
      'शेतकरी तपशील भरा',
      'जमीन नोंदी सादर करा'
    ],
    documentsRequired: [
      'Aadhaar card',
      'Bank account details',
      'Land ownership documents',
      'Mobile number'
    ],
    documentsRequiredMarathi: [
      'आधार कार्ड',
      'बँक खाते तपशील',
      'जमीन मालकी कागदपत्र',
      'मोबाइल नंबर'
    ],
    applyLink: 'https://pmkisan.gov.in',
    faqs: [
      {
        question: 'What is the benefit amount?',
        questionMarathi: 'लाभाची रक्कम किती आहे?',
        answer: '₹6000 per year paid in three equal installments of ₹2000 each.',
        answerMarathi: 'दरवर्षी ₹६००० तीन समान हप्त्यांत ₹२००० प्रत्येकी दिले जाते.'
      }
    ]
  },
  {
    id: 'swachh-bharat',
    title: 'Swachh Bharat Mission',
    titleMarathi: 'स्वच्छ भारत मिशन',
    type: 'central',
    department: 'Rural Development',
    departmentMarathi: 'ग्रामीण विकास',
    description: 'Making India clean and open defecation free.',
    descriptionMarathi: 'भारत स्वच्छ आणि खुल्या शौचालयमुक्त बनवणे.',
    detailedDescription: 'Swachh Bharat Mission is a nation-wide campaign initiated by the Government of India to eliminate open defecation and improve solid waste management. The mission aims to achieve universal sanitation coverage and to put focus on sanitation in rural areas.',
    image: '/assets/schemes/swachh-bharat.jpg',
    eligibility: 'All households without proper sanitation facilities',
    deadline: null,
    benefits: [
      'Toilet construction incentive up to ₹12,000',
      'Improved health and hygiene',
      'Environmental benefits'
    ],
    benefitsMarathi: [
      'शौचालय बांधणीसाठी ₹१२,००० पर्यंत प्रोत्साहन',
      'सुधारित आरोग्य आणि स्वच्छता',
      'पर्यावरणीय फायदे'
    ],
    applicationSteps: [
      'Apply at Gram Panchayat office',
      'Fill application form',
      'Submit required documents',
      'Get approval and start construction'
    ],
    applicationStepsMarathi: [
      'ग्रामपंचायत कार्यालयात अर्ज करा',
      'अर्ज फॉर्म भरा',
      'आवश्यक कागदपत्रे सादर करा',
      'मान्यता मिळवा आणि बांधकाम सुरू करा'
    ],
    documentsRequired: [
      'Aadhaar card',
      'Bank account details',
      'Photograph',
      'Address proof'
    ],
    documentsRequiredMarathi: [
      'आधार कार्ड',
      'बँक खाते तपशील',
      'छायाचित्र',
      'पत्ता पुरावा'
    ],
    applyLink: 'https://swachhbharatmission.gov.in',
    faqs: [
      {
        question: 'What is the incentive amount for toilet construction?',
        questionMarathi: 'शौचालय बांधणीसाठी प्रोत्साहन रक्कम किती आहे?',
        answer: 'Up to ₹12,000 is provided as incentive for toilet construction.',
        answerMarathi: 'शौचालय बांधणीसाठी ₹१२,००० पर्यंत प्रोत्साहन दिले जाते.'
      }
    ]
  }
];
