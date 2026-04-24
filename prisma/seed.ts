import { PrismaClient, SchemeType, AnnouncementType, GalleryType } from '../src/generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Clean existing data (order matters due to FK constraints)
  await prisma.gallery.deleteMany();
  await prisma.scheme.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.department.deleteMany();
  await prisma.user.deleteMany();

  console.log('🗑️  Cleared existing data');

  // ─── Departments ────────────────────────────────────────────────────────────
  const departments = await Promise.all([
    prisma.department.create({
      data: {
        slug: 'rural-development',
        name: 'Rural Development',
        description:
          'Responsible for implementing rural development schemes and infrastructure projects.',
        image: '/assets/departments/rural-dev.jpg',
        contact: '02162-234567',
        hierarchy: [
          {
            title: 'Block Development Officer',
            name: 'Shri. Vikram Joshi',
            children: [
              {
                title: 'Assistant BDO',
                name: 'Smt. Priya Kale',
                children: [
                  { title: 'Gram Sevak', name: 'Shri. Raju Patil' },
                  { title: 'Gram Sevak', name: 'Smt. Sunita Jadhav' },
                ],
              },
            ],
          },
        ],
      },
    }),
    prisma.department.create({
      data: {
        slug: 'education',
        name: 'Education',
        description:
          'Overseeing primary and secondary education in the Panchayat Samiti area.',
        image: '/assets/departments/education.jpg',
        contact: '02162-234568',
        hierarchy: [
          {
            title: 'Education Officer',
            name: 'Dr. Meera Kulkarni',
            children: [
              {
                title: 'Assistant Education Officer',
                name: 'Shri. Arun Patil',
                children: [
                  { title: 'School Inspector', name: 'Smt. Kavita Sharma' },
                ],
              },
            ],
          },
        ],
      },
    }),
    prisma.department.create({
      data: {
        slug: 'health',
        name: 'Health',
        description: 'Providing healthcare services and implementing health schemes.',
        image: '/assets/departments/health.jpg',
        contact: '02162-234569',
        hierarchy: [
          {
            title: 'Medical Officer',
            name: 'Dr. Rajesh Deshmukh',
            children: [
              { title: 'Staff Nurse', name: 'Smt. Shital Pawar' },
              { title: 'ASHA Worker', name: 'Smt. Rukhmini Bhosale' },
            ],
          },
        ],
      },
    }),
    prisma.department.create({
      data: {
        slug: 'agriculture',
        name: 'Agriculture',
        description:
          'Supporting farmers and implementing agricultural development programs.',
        image: '/assets/departments/agriculture.jpg',
        contact: '02162-234570',
        hierarchy: [
          {
            title: 'Agriculture Officer',
            name: 'Shri. Santosh Jadhav',
            children: [
              { title: 'Agriculture Assistant', name: 'Shri. Mahesh Pawar' },
            ],
          },
        ],
      },
    }),
    prisma.department.create({
      data: {
        slug: 'water-supply',
        name: 'Water Supply & Sanitation',
        description:
          'Ensuring safe drinking water and sanitation facilities across all villages.',
        image: '/assets/departments/water-supply.jpg',
        contact: '02162-234571',
        hierarchy: [
          {
            title: 'Junior Engineer',
            name: 'Shri. Nilesh Kadam',
            children: [
              { title: 'Technical Assistant', name: 'Shri. Deepak More' },
            ],
          },
        ],
      },
    }),
    prisma.department.create({
      data: {
        slug: 'social-welfare',
        name: 'Social Welfare',
        description:
          'Implementing welfare programs for women, children, and marginalized communities.',
        image: '/assets/departments/social-welfare.jpg',
        contact: '02162-234572',
        hierarchy: [
          {
            title: 'Child Development Project Officer',
            name: 'Smt. Anita Shinде',
            children: [
              { title: 'Anganwadi Supervisor', name: 'Smt. Lata Gaikwad' },
              { title: 'Anganwadi Supervisor', name: 'Smt. Nanda Salve' },
            ],
          },
        ],
      },
    }),
  ]);

  const [ruralDev, education, health, agriculture, waterSupply, socialWelfare] =
    departments;

  console.log(`✅ Created ${departments.length} departments`);

  // ─── Department Gallery Images ───────────────────────────────────────────────
  await prisma.gallery.createMany({
    data: [
      { url: '/assets/departments/rural-dev-1.jpg', type: GalleryType.Department, departmentId: ruralDev.id },
      { url: '/assets/departments/rural-dev-2.jpg', type: GalleryType.Department, departmentId: ruralDev.id },
      { url: '/assets/departments/rural-dev-3.jpg', type: GalleryType.Department, departmentId: ruralDev.id },
      { url: '/assets/departments/education-1.jpg', type: GalleryType.Department, departmentId: education.id },
      { url: '/assets/departments/education-2.jpg', type: GalleryType.Department, departmentId: education.id },
      { url: '/assets/departments/health-1.jpg',    type: GalleryType.Department, departmentId: health.id },
      { url: '/assets/departments/health-2.jpg',    type: GalleryType.Department, departmentId: health.id },
    ],
  });

  // ─── Schemes ─────────────────────────────────────────────────────────────────
  const schemes = await Promise.all([
    // Rural Development
    prisma.scheme.create({
      data: {
        slug: 'pm-awas-yojana',
        name: 'Pradhan Mantri Awas Yojana',
        shortDesc: 'Housing for all with pucca house to every eligible beneficiary.',
        description:
          'The Pradhan Mantri Awas Yojana (PMAY) is a flagship scheme by the Government of India to provide affordable housing to the rural poor. Beneficiaries receive financial assistance to construct or enhance their houses with basic amenities.',
        image: '/assets/schemes/pmay.jpg',
        type: SchemeType.Central,
        departmentId: ruralDev.id,
        eligibility: 'Families without a pucca house and below poverty line.',
        deadline: new Date('2026-12-31'),
        benifits:
          'Financial assistance up to ₹1.2 lakh for house construction; interest subsidy on home loans; priority to women, SC/ST, and minorities.',
        howToApply:
          'Visit the official PMAY website or Gram Panchayat office. Fill the application form, attach necessary documents, and submit to the concerned authority.',
        documentsReq:
          'Income certificate, Caste certificate (if applicable), Aadhaar card, Bank account details, Land documents.',
        applyLink: 'https://pmayg.nic.in',
      },
    }),
    prisma.scheme.create({
      data: {
        slug: 'mgnrega',
        name: 'Mahatma Gandhi National Rural Employment Guarantee Act',
        shortDesc: 'Guaranteed 100 days of wage employment to rural households per year.',
        description:
          'MGNREGA is one of the largest work guarantee programmes in the world. It enhances livelihood security in rural areas by providing at least 100 days of guaranteed wage employment in a financial year to every household whose adult members volunteer to do unskilled manual work.',
        image: '/assets/schemes/mgnrega.jpg',
        type: SchemeType.Central,
        departmentId: ruralDev.id,
        eligibility:
          'Adult members of rural households willing to do unskilled manual work.',
        benifits:
          '100 days guaranteed employment per household per year; minimum wages as per state rates; work within 5 km of residence; at least 33% women participation.',
        howToApply:
          'Apply for a job card at your Gram Panchayat, then submit an application for work. Work is to be provided within 15 days.',
        documentsReq: 'Aadhaar card, Bank account details, Address proof, Photograph.',
        applyLink: 'https://nrega.nic.in',
      },
    }),
    prisma.scheme.create({
      data: {
        slug: 'swachh-bharat-mission',
        name: 'Swachh Bharat Mission',
        shortDesc: 'Making India open-defecation free with toilet construction incentives.',
        description:
          'Swachh Bharat Mission is a nationwide campaign to eliminate open defecation and improve solid waste management. The mission aims to achieve universal sanitation coverage in rural areas.',
        image: '/assets/schemes/swachh-bharat.jpg',
        type: SchemeType.Central,
        departmentId: ruralDev.id,
        eligibility: 'All households without proper sanitation facilities.',
        benifits:
          'Toilet construction incentive up to ₹12,000; improved health and hygiene; community sanitation units.',
        howToApply:
          'Apply at the Gram Panchayat office with the required documents. After approval, construction may begin.',
        documentsReq: 'Aadhaar card, Bank account details, Photograph, Address proof.',
        applyLink: 'https://swachhbharatmission.gov.in',
      },
    }),
    // Agriculture
    prisma.scheme.create({
      data: {
        slug: 'pm-kisan-samman-nidhi',
        name: 'PM-KISAN Samman Nidhi',
        shortDesc: 'Income support of ₹6,000 per year to small and marginal farmers.',
        description:
          'PM-KISAN is a Central Sector Scheme launched in 2019 to supplement the financial needs of landholder farmers. A financial benefit of ₹6,000 per year is transferred in three equal installments into the farmer\'s bank account.',
        image: '/assets/schemes/pm-kisan.jpg',
        type: SchemeType.Central,
        departmentId: agriculture.id,
        eligibility: 'Small and marginal farmers with cultivable land.',
        benifits:
          '₹6,000 per year in three installments of ₹2,000 each via direct bank transfer; no restriction on family size.',
        howToApply:
          'Visit the PM-KISAN portal and register using your Aadhaar number, then fill in farmer details and submit land records.',
        documentsReq:
          'Aadhaar card, Bank account details, Land ownership documents, Mobile number.',
        applyLink: 'https://pmkisan.gov.in',
      },
    }),
    prisma.scheme.create({
      data: {
        slug: 'krishi-sinchayee-yojana',
        name: 'Pradhan Mantri Krishi Sinchayee Yojana',
        shortDesc: 'Expand irrigation coverage and improve water use efficiency on farm.',
        description:
          'PMKSY aims to extend the coverage of irrigation "Har Khet ko Pani" and improve water use efficiency "More Crop per Drop" in a focused manner with end-to-end solutions on source creation, distribution, management, and application.',
        image: '/assets/schemes/pmksy.jpg',
        type: SchemeType.Central,
        departmentId: agriculture.id,
        eligibility: 'Farmers with agricultural land in need of irrigation support.',
        benifits:
          'Subsidy on micro-irrigation equipment; improved crop yields; drought resilience; end-to-end water management support.',
        howToApply:
          'Contact the Agriculture Department office. Eligible farmers can apply through the state agriculture department portal.',
        documentsReq:
          'Land ownership documents, Aadhaar card, Bank account details, Farmer registration number.',
        applyLink: 'https://pmksy.gov.in',
      },
    }),
    // Education
    prisma.scheme.create({
      data: {
        slug: 'samagra-shiksha',
        name: 'Samagra Shiksha Abhiyan',
        shortDesc: 'Holistic school education support from pre-primary to Class XII.',
        description:
          'Samagra Shiksha is an integrated scheme for school education extending from pre-school to Class XII. It includes the erstwhile Sarva Shiksha Abhiyan, Rashtriya Madhyamik Shiksha Abhiyan, and Teacher Education, treating school education as a continuum.',
        image: '/assets/schemes/samagra-shiksha.jpg',
        type: SchemeType.Central,
        departmentId: education.id,
        eligibility: 'All children of school-going age (3–18 years) in the area.',
        benifits:
          'Free textbooks, school uniforms, mid-day meals, and infrastructure support; special focus on girls and children with disabilities.',
        howToApply:
          'Enroll at the nearest government or aided school. Scholarships and benefits are applied automatically after enrollment.',
        documentsReq: 'Birth certificate, Aadhaar card, Previous school records.',
        applyLink: 'https://samagrashiksha.in',
      },
    }),
    prisma.scheme.create({
      data: {
        slug: 'national-scholarship-portal',
        name: 'National Scholarship Portal',
        shortDesc: 'Central platform for scholarships for students from pre-matric to PhD.',
        description:
          'The National Scholarship Portal (NSP) is a one-stop platform for students seeking various government scholarships. It streamlines the end-to-end scholarship process from student application to disbursement of scholarships to the student\'s account.',
        image: '/assets/schemes/nsp.jpg',
        type: SchemeType.Central,
        departmentId: education.id,
        eligibility:
          'Students from Classes I–XII, undergraduate, postgraduate, and PhD programmes belonging to SC/ST/OBC/minority communities or economically weaker sections.',
        benifits:
          'Scholarships ranging from ₹1,200 to ₹20,000+ per year depending on level of study; direct bank transfer.',
        howToApply:
          'Register on the National Scholarship Portal and apply for the relevant scholarship. Academic certificates and income proof are required.',
        documentsReq:
          'Aadhaar card, Bank account, Income certificate, Caste certificate, Mark sheets, School/college enrollment proof.',
        applyLink: 'https://scholarships.gov.in',
      },
    }),
    // Health
    prisma.scheme.create({
      data: {
        slug: 'ayushman-bharat',
        name: 'Ayushman Bharat – PM-JAY',
        shortDesc: 'Health insurance of ₹5 lakh per family per year for secondary & tertiary care.',
        description:
          'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY) is the world\'s largest government-funded health insurance scheme. It provides health cover of ₹5 lakh per family per year for secondary and tertiary hospitalisation to over 12 crore poor and vulnerable families.',
        image: '/assets/schemes/ayushman-bharat.jpg',
        type: SchemeType.Central,
        departmentId: health.id,
        eligibility:
          'Families listed in SECC-2011 database; rural families in D1–D5 deprivation categories and occupational criteria.',
        benifits:
          'Health cover of ₹5 lakh per family per year; cashless treatment at empanelled hospitals; covers pre- and post-hospitalisation.',
        howToApply:
          'Check eligibility at the nearest Common Service Centre or Ayushman Bharat Seva Kendra. No enrollment needed if your family is already listed.',
        documentsReq: 'Aadhaar card, Ration card, Mobile number.',
        applyLink: 'https://pmjay.gov.in',
      },
    }),
    prisma.scheme.create({
      data: {
        slug: 'janani-suraksha-yojana',
        name: 'Janani Suraksha Yojana',
        shortDesc: 'Cash assistance to pregnant women from below-poverty-line families for safe delivery.',
        description:
          'Janani Suraksha Yojana (JSY) is a safe motherhood intervention under the National Health Mission. It is being implemented with the objective of reducing maternal and neonatal mortality by promoting institutional delivery among poor pregnant women.',
        image: '/assets/schemes/jsy.jpg',
        type: SchemeType.Central,
        departmentId: health.id,
        eligibility:
          'Pregnant women aged 19 years and above from below-poverty-line families for up to two live births.',
        benifits:
          'Cash assistance of ₹1,400 in rural areas and ₹1,000 in urban areas; free institutional delivery; accredited social health activist (ASHA) support.',
        howToApply:
          'Register at the nearest sub-centre or PHC during antenatal visits. The ASHA worker will assist with registration.',
        documentsReq:
          'BPL card, Aadhaar card, Antenatal care card, Bank account details.',
        applyLink: 'https://nhm.gov.in',
      },
    }),
    // Water Supply
    prisma.scheme.create({
      data: {
        slug: 'jal-jeevan-mission',
        name: 'Jal Jeevan Mission',
        shortDesc: 'Tap water connection to every rural household by 2024.',
        description:
          'Jal Jeevan Mission aims to provide safe and adequate drinking water through individual household tap connections by 2024 to all households in rural India. The mission also plans to implement source sustainability measures.',
        image: '/assets/schemes/jjm.jpg',
        type: SchemeType.Central,
        departmentId: waterSupply.id,
        eligibility: 'All rural households without a functional household tap connection.',
        benifits:
          'Free household tap connection; minimum 55 litres per capita per day of potable water; reduction in water-borne diseases.',
        howToApply:
          'Contact your Gram Panchayat or Village Water & Sanitation Committee (VWSC) to register for a tap connection.',
        documentsReq: 'Aadhaar card, Address proof, Photograph.',
        applyLink: 'https://jaljeevanmission.gov.in',
      },
    }),
    // Social Welfare
    prisma.scheme.create({
      data: {
        slug: 'poshan-abhiyaan',
        name: 'POSHAN Abhiyaan',
        shortDesc: 'National Nutrition Mission to improve nutritional outcomes for children and women.',
        description:
          'POSHAN Abhiyaan (Prime Minister\'s Overarching Scheme for Holistic Nourishment) is India\'s flagship programme to improve nutritional outcomes for children, pregnant women, and lactating mothers. It leverages technology, convergence, and community participation.',
        image: '/assets/schemes/poshan.jpg',
        type: SchemeType.Central,
        departmentId: socialWelfare.id,
        eligibility:
          'Children from 0–6 years, pregnant women, and lactating mothers, especially from underprivileged backgrounds.',
        benifits:
          'Supplementary nutrition through Anganwadi centres; growth monitoring; health and nutrition education; referral services.',
        howToApply:
          'Visit the nearest Anganwadi centre. Register your child or yourself (if pregnant/lactating) with the Anganwadi worker.',
        documentsReq: 'Aadhaar card, Birth certificate (for child), Pregnancy card (for mothers).',
        applyLink: 'https://poshantracker.in',
      },
    }),
  ]);

  console.log(`✅ Created ${schemes.length} schemes`);

  // ─── Announcements ───────────────────────────────────────────────────────────
  const announcements = await prisma.announcement.createMany({
    data: [
      {
        type: AnnouncementType.Notice,
        title: 'Gram Sabha Meeting – May 2025',
        content:
          'All Gram Panchayat members are invited to attend the Gram Sabha meeting on 15 May 2025 at the Block Development Office, Wai. The agenda includes review of MGNREGA progress and PMAY beneficiary list finalization.',
      },
      {
        type: AnnouncementType.Alert,
        title: 'Heavy Rainfall Warning – Satara District',
        content:
          'The India Meteorological Department has issued a heavy rainfall warning for Satara district on 28–30 April 2025. Citizens in low-lying areas are advised to remain vigilant. Emergency helpline: 112.',
      },
      {
        type: AnnouncementType.Update,
        title: 'PM-KISAN 19th Installment Released',
        content:
          'The 19th installment of PM-KISAN Samman Nidhi has been released. Registered farmers will receive ₹2,000 directly in their linked bank accounts within 2–3 working days. Contact your Agriculture Assistant for any queries.',
      },
      {
        type: AnnouncementType.Notice,
        title: 'Ayushman Bharat Card Distribution Camp',
        content:
          'A special camp for distributing Ayushman Bharat health cards will be held at the Panchayat Samiti Wai premises on 5 May 2025 from 10 AM to 4 PM. Beneficiaries should bring their Aadhaar card and ration card.',
      },
      {
        type: AnnouncementType.Update,
        title: 'Jal Jeevan Mission – Progress Update',
        content:
          'As of April 2025, 78% of households in Wai Taluka have been provided functional household tap connections under the Jal Jeevan Mission. Work on remaining villages is in progress and will be completed by June 2025.',
      },
      {
        type: AnnouncementType.Notice,
        title: 'National Scholarship Portal – Application Open',
        content:
          'Applications for National Scholarships for academic year 2025–26 are now open on the NSP portal. Students from Classes I–XII and higher education can apply by 31 July 2025. Assistance available at the Education Department office.',
      },
    ],
  });

  console.log(`✅ Created ${announcements.count} announcements`);
  console.log('\n🎉 Seed completed successfully!');
  console.log(`   Departments : ${departments.length}`);
  console.log(`   Schemes     : ${schemes.length}`);
  console.log(`   Announcements: ${announcements.count}`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
