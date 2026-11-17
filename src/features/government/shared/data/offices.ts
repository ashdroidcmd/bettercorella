import type { Office } from '../types/index.ts';

// Source: "List of Offices", Municipality of Corella Citizen's Charter 2026 (2nd ed.), checked 2026-11-14.
// Heads and staff were read from each office's poster on its page on corella-bohol.gov.ph (2026-11-17);
// `sourceUrl` is that page. Phone and email stay as in the charter; where the charter had none, they come
// from the office page's contact cards (Treasurer's mobile, Accounting and Agriculture emails). The Human
// Resource Management and Tourism offices are listed on the website but not in the charter.
// MPDC and Waterworks have no office page, so their heads are not listed.
// serviceCount is computed from services.ts.
import { services } from '../../../services/shared/data/services.ts';

const offices0: Office[] = [
  {
    "slug": "mayors-office",
    "name": "Office of the Municipal Mayor",
    "code": "MO",
    "sector": "Executive",
    "head": "Juan Manuel Y. Lim",
    "position": "Municipal Mayor",
    "staff": [
      {
        "name": "Eduardo C. Macalandag, MSc",
        "position": "Municipal Administrator"
      },
      {
        "name": "Mildred M. Luzon",
        "position": "Administrative Aide II; Chief of Staff"
      },
      {
        "name": "Dianne Michelle S. Daquio",
        "position": "Administrative Aide VI; Local Youth Development Officer (designate)"
      },
      {
        "name": "Francis G. Bansag",
        "position": "Administrative Aide II; General Services Officer (designate)"
      },
      {
        "name": "Maria Gina T. Lumain",
        "position": "Administrative Aide II; Business Permit and Licensing Officer (designate)"
      },
      {
        "name": "Reedan I. Luzon",
        "position": "Administrative Aide II; Municipal Traffic Management Officer (designate)"
      },
      {
        "name": "Alvie Mae P. Maragañas",
        "position": "Office Staff"
      },
      {
        "name": "Rosemarie Grace V. Lozada",
        "position": "Front Desk Personnel"
      },
      {
        "name": "Thowileen C. Lumain",
        "position": "Janitorial"
      },
      {
        "name": "Nerie E. Bete",
        "position": "Janitorial"
      }
    ],
    "contact": "(038) 422-3865",
    "email": "municipality.corella@gmail.com",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/office-of-the-municipal-mayor/"
  },
  {
    "slug": "sangguniang-bayan",
    "name": "Office of the Sangguniang Bayan",
    "code": "SB",
    "sector": "Legislative",
    "head": "Danilo D. Bandala",
    "position": "Municipal Vice Mayor (presiding officer)",
    "staff": [
      {
        "name": "Claudia D. Narisma, JD",
        "position": "SB Secretary"
      },
      {
        "name": "Ma. Rowena C. Salang",
        "position": "Administrative Aide III"
      },
      {
        "name": "Erwin S. Ramo",
        "position": "Messenger"
      },
      {
        "name": "Ma. Laviña T. Caluba",
        "position": "Office Staff"
      },
      {
        "name": "Melody Lynn A. Sayon",
        "position": "Office Staff"
      },
      {
        "name": "Angelie Anlay",
        "position": "Office Staff"
      },
      {
        "name": "Cherline P. Lumantao",
        "position": "Office Staff"
      },
      {
        "name": "Irene D. Manlangit",
        "position": "Janitorial"
      }
    ],
    "contact": "0912-414-4260",
    "email": "sbcorella@gmail.com",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/office-of-the-sangguniang-bayan/"
  },
  {
    "slug": "accounting-office",
    "name": "Municipal Accounting Office",
    "code": "MACCO",
    "sector": "Finance",
    "head": "Reynan G. Bamuya, CPA",
    "position": "Municipal Accountant",
    "staff": [
      {
        "name": "Aurora J. Baugbog",
        "position": "Senior Bookkeeper"
      },
      {
        "name": "Jose Mariel L. Talisic",
        "position": "Administrative Aide III"
      },
      {
        "name": "Cecilita L. Mantica",
        "position": "Administrative Aide III"
      },
      {
        "name": "Katherine B. Fuentes",
        "position": "Office Staff"
      },
      {
        "name": "Necita Caliao",
        "position": "Office Staff"
      }
    ],
    "contact": "0917-777-0545",
    "email": "accountingcorella@yahoo.com.ph",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/municipal-accounting-office/"
  },
  {
    "slug": "assessors-office",
    "name": "Municipal Assessor's Office",
    "code": "MASSO",
    "sector": "Finance",
    "head": "Rosylito T. Malanog, REE, EnP",
    "position": "Municipal Assessor",
    "staff": [
      {
        "name": "Anecita C. Bontuan",
        "position": "Administrative Aide III"
      },
      {
        "name": "Celeste Marie P. Cutin",
        "position": "Administrative Aide III"
      },
      {
        "name": "Bonito L. Jawa",
        "position": "Administrative Aide III"
      }
    ],
    "contact": "0919-706-0969",
    "email": "",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/municipal-assessors-office/"
  },
  {
    "slug": "budget-office",
    "name": "Municipal Budget Office",
    "code": "MBO",
    "sector": "Finance",
    "head": "Maria Flor S. Ello, MPA",
    "position": "Municipal Budget Officer",
    "staff": [
      {
        "name": "Aimee B. Gomez",
        "position": "Administrative Aide III"
      },
      {
        "name": "Myrna A. Laoay",
        "position": "Office Staff"
      },
      {
        "name": "Gelene A. Quaio",
        "position": "Office Staff"
      },
      {
        "name": "Marcelina J. Oguis",
        "position": "Budget Consultant"
      }
    ],
    "contact": "0912-342-5105",
    "email": "mbocorella@gmail.com",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/municipal-budget-office/"
  },
  {
    "slug": "treasurers-office",
    "name": "Municipal Treasurer's Office",
    "code": "MTO",
    "sector": "Finance",
    "head": "Reynaldo D. Salang",
    "position": "Municipal Treasurer",
    "staff": [
      {
        "name": "Cristimae I. Rumay",
        "position": "Revenue Collection Clerk II"
      },
      {
        "name": "Rosalyn A. Jumawid",
        "position": "Revenue Collection Clerk II"
      },
      {
        "name": "Teodulo S. Añong",
        "position": "Administrative Aide III"
      },
      {
        "name": "Antonette L. Tagaan",
        "position": "Administrative Aide III"
      },
      {
        "name": "Jasmin C. Baldapan",
        "position": "Office Staff"
      },
      {
        "name": "Miriam S. Gaterin",
        "position": "Office Staff"
      },
      {
        "name": "Recil C. Gapol",
        "position": "Office Staff"
      },
      {
        "name": "Milalona C. Pacot",
        "position": "Office Staff"
      },
      {
        "name": "Joan M. Atacador",
        "position": "Office Staff"
      }
    ],
    "contact": "0975-517-2169",
    "email": "mtocorella@gmail.com",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/municipal-treasurers-office/"
  },
  {
    "slug": "civil-registrar",
    "name": "Municipal Civil Registrar's Office",
    "code": "MCR",
    "sector": "Civil registry",
    "head": "Eva Lorraine C. Bahan",
    "position": "Municipal Civil Registrar",
    "staff": [
      {
        "name": "Maria P. Mahinay",
        "position": "Assistant Registration Officer"
      }
    ],
    "contact": "0910-572-1998",
    "email": "lcrcorella@gmail.com",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/municipal-civil-registrar/"
  },
  {
    "slug": "planning-and-development-office",
    "name": "Municipal Planning and Development Coordinator's Office",
    "code": "MPDC",
    "sector": "Planning and infrastructure",
    "head": "",
    "position": "",
    "staff": [],
    "contact": "0995-474-3763",
    "email": "",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx"
  },
  {
    "slug": "engineering-office",
    "name": "Municipal Engineering Office",
    "code": "MEO",
    "sector": "Planning and infrastructure",
    "head": "Engr. Aldous Mark S. Salang",
    "position": "Municipal Engineer",
    "staff": [
      {
        "name": "Maria Asuncion L. Pandan",
        "position": "Administrative Aide VI"
      },
      {
        "name": "Ar. Ariel N. Apatay",
        "position": "Architect I"
      },
      {
        "name": "Engr. Rosanna C. Bagaipo",
        "position": "Engineer I"
      },
      {
        "name": "Gervin P. Sayon",
        "position": "Administrative Aide III"
      },
      {
        "name": "Engr. Amie Hope L. Rebuta",
        "position": "Contract of Service Engineer"
      },
      {
        "name": "Mary Kariss Claire C. Juan",
        "position": "Office Staff"
      },
      {
        "name": "Jaime I. Arambala",
        "position": "Office Staff"
      },
      {
        "name": "Hilarion B. Vale",
        "position": "Electrician"
      },
      {
        "name": "Apolinar Badiang",
        "position": "Electrician"
      },
      {
        "name": "Epifanio M. Agur",
        "position": "Driver"
      },
      {
        "name": "Materno L. Ahit, Jr.",
        "position": "Driver"
      },
      {
        "name": "John Louiel T. Remolador",
        "position": "Laborer"
      },
      {
        "name": "Damascino A. Vale",
        "position": "Laborer"
      },
      {
        "name": "Florencio L. Borja",
        "position": "Laborer"
      }
    ],
    "contact": "0950-125-3565",
    "email": "corella.meo@gmail.com",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/municipal-engineers-office/"
  },
  {
    "slug": "waterworks-office",
    "name": "Corella Waterworks System Office",
    "code": "CWS",
    "sector": "Planning and infrastructure",
    "head": "",
    "position": "",
    "staff": [],
    "contact": "0927-837-2446",
    "email": "waterworksystem2023@gmail.com",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx"
  },
  {
    "slug": "health-office",
    "name": "Municipal Health Office",
    "code": "MHO",
    "sector": "Health and social services",
    "head": "Dr. Apollo John O. Bernaldez",
    "position": "Municipal Health Officer",
    "staff": [
      {
        "name": "Gemma M. Inguito, RN",
        "position": "Nurse II"
      },
      {
        "name": "Elizabeth S. Jamil, RM",
        "position": "Midwife II"
      },
      {
        "name": "Cleofe E. Doterte, RM",
        "position": "Midwife II"
      },
      {
        "name": "Leonard I. Bandala",
        "position": "Administrative Aide III"
      },
      {
        "name": "Loradel R. Sioco",
        "position": "Administrative Aide III"
      },
      {
        "name": "Jessa Grace J. Velasquez, RN",
        "position": "Nutrition Staff"
      },
      {
        "name": "Paulita V. Lumain",
        "position": "Birthing Staff"
      },
      {
        "name": "Maria Rosmarifel D. Olmedo",
        "position": "Office Staff"
      },
      {
        "name": "Maria Felia M. Porol",
        "position": "Office Staff"
      },
      {
        "name": "Emerald T. Sambajon",
        "position": "Office Staff"
      },
      {
        "name": "Dennis Lee A. Vale",
        "position": "Office Staff"
      },
      {
        "name": "Connie Consolacion D. Porol",
        "position": "Janitorial"
      },
      {
        "name": "John Rey D. Enero",
        "position": "Ambulance Driver"
      },
      {
        "name": "Danielo C. Darunday",
        "position": "Ambulance Driver"
      },
      {
        "name": "John C. Bosa",
        "position": "Ambulance Driver"
      }
    ],
    "contact": "0932-843-6516",
    "email": "corellamho@yahoo.com",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/municipal-health-office/"
  },
  {
    "slug": "social-welfare-office",
    "name": "Municipal Social Welfare and Development Office",
    "code": "MSWDO",
    "sector": "Health and social services",
    "head": "Andrew L. Soliva, RSW",
    "position": "Municipal Social Welfare Officer III",
    "staff": [
      {
        "name": "Rosario D. Mahinay",
        "position": "OSCA President"
      },
      {
        "name": "Celso C. Buagas",
        "position": "Administrative Aide III"
      },
      {
        "name": "Divina B. Rollorazo",
        "position": "Office Staff"
      },
      {
        "name": "Rosby Niña R. Bandala",
        "position": "Office Staff"
      },
      {
        "name": "Clowie Dalrymple P. Ramo",
        "position": "Office Staff"
      }
    ],
    "contact": "0918-573-5315",
    "email": "",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/municipal-social-welfare-development-office/"
  },
  {
    "slug": "agriculture-office",
    "name": "Municipal Agriculture Office",
    "code": "MAO",
    "sector": "Agriculture",
    "head": "Alvin C. Malanog",
    "position": "Municipal Agricultural Officer",
    "staff": [
      {
        "name": "Aimy B. Sentorias",
        "position": "Agricultural Technician (Rice and Corn)"
      },
      {
        "name": "Lecenio P. Rebuya, Jr.",
        "position": "Agricultural Technician (Livestock)"
      },
      {
        "name": "Ma. Donabel L. Gumapac",
        "position": "Agricultural Technician (High Value Crops)"
      },
      {
        "name": "Marilyn L. Gaterin",
        "position": "Fishery Technician (designate)"
      },
      {
        "name": "Roldan N. Ahon",
        "position": "Meat Inspector"
      },
      {
        "name": "Robert A. Dago-oc",
        "position": "Tractor Operator"
      },
      {
        "name": "Haydee S. Renegado",
        "position": "Office Staff"
      },
      {
        "name": "Esmeraldo P. Maligsa III",
        "position": "Nursery Caretaker"
      },
      {
        "name": "Joverez Amasa",
        "position": "Nursery Caretaker"
      },
      {
        "name": "Glenn A. Lumaad",
        "position": "Driver"
      },
      {
        "name": "Anecito G. Jawil",
        "position": "Dog Catcher"
      },
      {
        "name": "Mark Joseph A. Sarmiento",
        "position": "Dog Catcher"
      }
    ],
    "contact": "0951-635-9158",
    "email": "corella.mao@gmail.com",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/municipal-agriculture-office/"
  },
  {
    "slug": "disaster-risk-reduction-office",
    "name": "Municipal Disaster Risk Reduction and Management Office",
    "code": "MDRRMO",
    "sector": "Public safety",
    "head": "Ar. Jerome B. Mahinay",
    "position": "MDRRMO Officer-in-Charge",
    "staff": [
      {
        "name": "Rosamyah D. Calunia",
        "position": "LDRRM Officer II"
      },
      {
        "name": "Carmelo Jake G. Daquipa",
        "position": "LDRRM Assistant"
      },
      {
        "name": "Maria Mavil C. Daquipil",
        "position": "Office Staff"
      },
      {
        "name": "Victor V. Pizarras",
        "position": "Search, Rescue and Retrieval Team"
      },
      {
        "name": "Fulgencio B. Daohog",
        "position": "Search, Rescue and Retrieval Team"
      },
      {
        "name": "Rogelio B. Dagolgol",
        "position": "Search, Rescue and Retrieval Team"
      },
      {
        "name": "John Jaemil J. Baugbog",
        "position": "Medical Response Team"
      },
      {
        "name": "Joenifer L. Agosto",
        "position": "Medical Response Team"
      },
      {
        "name": "Maria Joana P. Tan",
        "position": "Public Safety Telecommunicator"
      },
      {
        "name": "Rogelio S. Montajes",
        "position": "Driver"
      },
      {
        "name": "Davejay L. Calamongay",
        "position": "Driver"
      }
    ],
    "contact": "0920-378-8788",
    "email": "corella.drrm@gmail.com",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "https://corella-bohol.gov.ph/wp-content/uploads/2026/08/CITIZENS-CHARTER-2026-2nd-Edition-1.docx",
    "sourceUrl": "https://corella-bohol.gov.ph/municipal-disaster-risk-reduction-and-management-office/"
  },
  {
    "slug": "human-resources-office",
    "name": "Municipal Human Resource Management Office",
    "code": "HRMO",
    "sector": "Executive",
    "head": "Maria Isabel O. Ribay",
    "position": "Human Resource Management Officer I",
    "staff": [
      {
        "name": "Vanissa U. Montel",
        "position": "Office Staff"
      }
    ],
    "contact": "0948-319-1549",
    "email": "",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "",
    "sourceUrl": "https://corella-bohol.gov.ph/municipal-human-resources-office/"
  },
  {
    "slug": "tourism-office",
    "name": "Municipal Tourism Office",
    "code": "MTOUR",
    "sector": "Tourism",
    "head": "Rosamyah D. Calunia",
    "position": "Municipal Tourism Officer (designate); LDRRM Officer II",
    "staff": [
      {
        "name": "Dominic L. Tocmo",
        "position": "Administrative Aide III"
      },
      {
        "name": "Maria Adela D. Montesclaros",
        "position": "Office Staff"
      }
    ],
    "contact": "0912-775-8875",
    "email": "corella.tourism@gmail.com",
    "address": "Poblacion, Corella, Bohol",
    "locals": "",
    "serviceCount": 0,
    "ccUrl": "",
    "sourceUrl": "https://corella-bohol.gov.ph/municipal-tourism-office/"
  }
];

export const offices: Office[] = offices0.map((office) => ({
  ...office,
  serviceCount: services.filter((service) => service.officeCode === office.code).length,
}));
