/* =========================================================
   K61 DIRECTORY — DATA FILE
   =========================================================
   This is the ONLY file you need to edit to add, update, or
   remove classmates. Everything else on the website (the
   directory grid, the specialty browser, and every profile
   page) is generated automatically from this list.

   HOW TO ADD A CLASSMATE
   -----------------------
   Copy one of the { ... } blocks below, paste it before the
   closing "]", and fill in the fields. Keep the commas.

   FIELDS
   -----------------------
   roll         Roll number in your batch (used to sort the
                grid and to build the profile page link).
                Must be unique.
   name         Full name, e.g. "Dr. Farhana Ahmed"
   photo        Path to their photo file. Put the actual photo
                file inside images/members/ and reference it
                here, e.g. "images/members/07.jpg".
                If you leave this blank (""), a placeholder
                avatar with their initials is shown instead —
                so the site works even before you have photos.
   designation  Their current title, e.g. "Associate Professor
                of Cardiology" or "Consultant Physician"
   specialty    Their field, e.g. "Cardiology", "Public Health",
                "General Surgery", "Medicine Researcher". This
                is what powers the "Browse by Specialty" tab —
                just keep the spelling consistent for people in
                the same field.
   workplace    Current hospital / institution / organisation
   phone        Phone number as they'd like it shown (optional,
                leave as "" to hide)
   email        Email address (optional, leave as "" to hide)
   linkedin     Full LinkedIn URL (optional, leave as "" to hide)
   facebook     Full Facebook URL (optional, leave as "" to hide)
   location     City / country (optional, shown on profile page)

   TIP: Delete the 6 sample entries below once you start adding
   your real batchmates — they're only there so the site has
   something to display when you first open it.
   ========================================================= */

const members = [
  {
    roll: 1,
    name: "Dr. Nusrat Jahan",
    photo: "",
    designation: "Associate Professor, Cardiology",
    specialty: "Cardiology",
    workplace: "National Institute of Cardiovascular Diseases (NICVD), Dhaka",
    phone: "+880 1XXX-XXXXXX",
    email: "nusrat.k61@example.com",
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com/",
    location: "Dhaka, Bangladesh"
  },
  {
    roll: 2,
    name: "Dr. Shariful Islam",
    photo: "",
    designation: "Consultant, General Surgery",
    specialty: "General Surgery",
    workplace: "Square Hospitals Ltd.",
    phone: "+880 1XXX-XXXXXX",
    email: "shariful.k61@example.com",
    linkedin: "",
    facebook: "https://facebook.com/",
    location: "Dhaka, Bangladesh"
  },
  {
    roll: 3,
    name: "Dr. Farhana Rahman",
    photo: "",
    designation: "Senior Research Fellow",
    specialty: "Public Health & Research",
    workplace: "icddr,b",
    phone: "",
    email: "farhana.k61@example.com",
    linkedin: "https://linkedin.com/in/",
    facebook: "",
    location: "Dhaka, Bangladesh"
  },
  {
    roll: 4,
    name: "Dr. Tanvir Ahmed",
    photo: "",
    designation: "Assistant Professor, Neurology",
    specialty: "Neurology",
    workplace: "Bangabandhu Sheikh Mujib Medical University (BSMMU)",
    phone: "+880 1XXX-XXXXXX",
    email: "tanvir.k61@example.com",
    linkedin: "",
    facebook: "",
    location: "Dhaka, Bangladesh"
  },
  {
    roll: 5,
    name: "Dr. Sadia Chowdhury",
    photo: "",
    designation: "Consultant, Obstetrics & Gynaecology",
    specialty: "Gynaecology & Obstetrics",
    workplace: "Chittagong Medical College Hospital",
    phone: "+880 1XXX-XXXXXX",
    email: "sadia.k61@example.com",
    linkedin: "https://linkedin.com/in/",
    facebook: "https://facebook.com/",
    location: "Chattogram, Bangladesh"
  },
  {
    roll: 6,
    name: "Dr. Imran Kabir",
    photo: "",
    designation: "GP & Clinical Lead",
    specialty: "Family Medicine",
    workplace: "NHS Trust",
    phone: "",
    email: "imran.k61@example.com",
    linkedin: "https://linkedin.com/in/",
    facebook: "",
    location: "London, United Kingdom"
  }
];
