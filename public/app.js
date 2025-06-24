const texts = {
  ar: {
    langBtn: "English",
    title: "استمارة الاقتراحات والشكاوى",
    labelPriority: "1. الأهمية",
    priorityPlaceholder: "اختر مستوى الأهمية",
    priorityOptions: ["عالية", "متوسطة", "منخفضة"],
    labelIssueType: "2. نوع المشكلة",
    issueTypePlaceholder: "اختر نوع المشكلة",
    issueTypeOptions: ["التنظيف", "المرافق", "التموين", "الأمن"],
    labelDescription: "3. وصف المشكلة",
    descriptionPlaceholder: "صف المشكلة بالتفصيل...",
    contactInfoHeader: "4. معلومات التواصل",
    labelName: "الاسم",
    namePlaceholder: "الاسم",
    labelPhone: "رقم الهاتف",
    phonePlaceholder: "رقم الهاتف",
    labelRoom: "رقم الغرفة",
    roomPlaceholder: "رقم الغرفة",
    labelEmail: "البريد الإلكتروني (اختياري)",
    emailPlaceholder: "البريد الإلكتروني",
    labelStaff: "الرقم الوظيفي (اختياري)",
    staffPlaceholder: "الرقم الوظيفي",
    submitBtn: "📨 إرسال البلاغ"
  },
  en: {
    langBtn: "العربية",
    title: "Suggustions & Complaint Form",
    labelPriority: "1. Priority",
    priorityPlaceholder: "Select Priority",
    priorityOptions: ["HIGH", "MEDIUM", "LOW"],
    labelIssueType: "2. Issue Type",
    issueTypePlaceholder: "Select Issue Type",
    issueTypeOptions: ["HouseKeeping", "Facility", "Catering", "Security"],
    labelDescription: "3. Description",
    descriptionPlaceholder: "Describe the issue...",
    contactInfoHeader: "4. Contact Info",
    labelName: "Name",
    namePlaceholder: "Name",
    labelPhone: "Phone Number",
    phonePlaceholder: "Phone Number",
    labelRoom: "Room Number",
    roomPlaceholder: "Room Number",
    labelEmail: "Email (optional)",
    emailPlaceholder: "Email (optional)",
    labelStaff: "Staff Number (optional)",
    staffPlaceholder: "Staff Number (optional)",
    submitBtn: "📨 Submit Report"
  }
};

let currentLang = "ar";

const elements = {
  langBtn: document.getElementById("toggleLang"),
  title: document.getElementById("formTitle"),
  labelPriority: document.getElementById("labelPriority"),
  priorityPlaceholder: document.getElementById("priorityPlaceholder"),
  prioritySelect: document.getElementById("priority"),
  labelIssueType: document.getElementById("labelIssueType"),
  issueTypePlaceholder: document.getElementById("issueTypePlaceholder"),
  issueTypeSelect: document.getElementById("issue-type"),
  labelDescription: document.getElementById("labelDescription"),
  description: document.getElementById("description"),
  contactInfoHeader: document.getElementById("contactInfoHeader"),
  labelName: document.getElementById("labelName"),
  nameInput: document.getElementById("name"),
  labelPhone: document.getElementById("labelPhone"),
  phoneInput: document.getElementById("phone"),
  labelRoom: document.getElementById("labelRoom"),
  roomInput: document.getElementById("room"),
  labelEmail: document.getElementById("labelEmail"),
  emailInput: document.getElementById("email"),
  labelStaff: document.getElementById("labelStaff"),
  staffInput: document.getElementById("staff"),
  submitBtn: document.getElementById("submitBtn"),
  formContainer: document.getElementById("formContainer")
};

function updateLang(lang) {
  currentLang = lang;
  const t = texts[lang];

  document.documentElement.lang = lang;
  document.body.dir = lang === "ar" ? "rtl" : "ltr";
  elements.formContainer.style.direction = lang === "ar" ? "rtl" : "ltr";

  elements.langBtn.textContent = t.langBtn;
  elements.title.textContent = t.title;

  elements.labelPriority.innerHTML = t.labelPriority + ' <span class="required">*</span>';
  elements.priorityPlaceholder.textContent = t.priorityPlaceholder;

  [...elements.prioritySelect.options].forEach((opt, i) => {
    if (i === 0) return;
    opt.textContent = t.priorityOptions[i - 1];
    opt.value = lang === "ar" ? t.priorityOptions[i - 1] : opt.value;
  });

  elements.labelIssueType.innerHTML = t.labelIssueType + ' <span class="required">*</span>';
  elements.issueTypePlaceholder.textContent = t.issueTypePlaceholder;

  [...elements.issueTypeSelect.options].forEach((opt, i) => {
    if (i === 0) return;
    opt.textContent = t.issueTypeOptions[i - 1];
    opt.value = lang === "ar" ? t.issueTypeOptions[i - 1] : opt.value;
  });

  elements.labelDescription.innerHTML = t.labelDescription + ' <span class="required">*</span>';
  elements.description.placeholder = t.descriptionPlaceholder;

  elements.contactInfoHeader.textContent = t.contactInfoHeader;

  elements.labelName.innerHTML = t.labelName + ' <span class="required">*</span>';
  elements.nameInput.placeholder = t.namePlaceholder;

  elements.labelPhone.innerHTML = t.labelPhone + ' <span class="required">*</span>';
  elements.phoneInput.placeholder = t.phonePlaceholder;

  elements.labelRoom.innerHTML = t.labelRoom + ' <span class="required">*</span>';
  elements.roomInput.placeholder = t.roomPlaceholder;

  elements.labelEmail.textContent = t.labelEmail;
  elements.emailInput.placeholder = t.emailPlaceholder;

  elements.labelStaff.textContent = t.labelStaff;
  elements.staffInput.placeholder = t.staffPlaceholder;

  elements.submitBtn.textContent = t.submitBtn;
}

elements.langBtn.addEventListener("click", () => {
  updateLang(currentLang === "ar" ? "en" : "ar");
});


updateLang("ar");

document.getElementById("complaintForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  // تحقق من صحة الفورم HTML5 built-in validation
  if (!this.checkValidity()) {
    this.reportValidity();
    return;
  }

      
  const formData = {
    "Location": "YIBAL",
    "Emergency Level": document.getElementById("priority").value,
    "Issue Type": document.getElementById("issue-type").value,
    "Responsible Department": document.getElementById("issue-type").value,
    "Issue Description": document.getElementById("description").value,
    "Name": document.getElementById("name").value,
    "Phone": document.getElementById("phone").value,
    "Room No": document.getElementById("room").value,
    "Email": document.getElementById("email").value,
    "Staff No": document.getElementById("staff").value
  };

  try {
    const response = await fetch("https://formsakan.onrender.com/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message);
    this.reset();
  } catch (error) {
    alert(currentLang === "ar" ? "❌ فشل في إرسال البلاغ" : "❌ Error sending report");
    console.error(error);
  }
});
