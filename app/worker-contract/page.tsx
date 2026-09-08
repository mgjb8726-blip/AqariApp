'use client';

import { ChangeEvent, useState } from 'react';
import './contract.css';

const terms = [
  'يلتزم الحرفي بتنفيذ الخدمة المتفق عليها بجودة عالية وفي الوقت المحدد.',
  'يلتزم الحرفي باستخدام المواد والأدوات المناسبة لإنجاز العمل.',
  'يلتزم الحرفي بالمحافظة على نظافة مكان العمل بعد إتمام الخدمة.',
  'يلتزم الحرفي بالتواصل مع الزبون عبر تطبيق عامل بخصوص تفاصيل العمل.',
  'يلتزم الحرفي بالسعر المتفق عليه دون زيادة غير مبررة.',
  'يحق لتطبيق عامل اتخاذ الإجراءات المناسبة عند مخالفة شروط الاستخدام.',
  'يحق للزبون طلب إلغاء العمل قبل البدء وفق المبلغ المستحق حسب الاتفاق.',
  'في حال تأخر الحرفي عن الموعد دون عذر مقبول، يحق للزبون المطالبة بالتعويض المناسب.',
  'يلتزم الطرفان بالحفاظ على سرية البيانات والمعلومات المتبادلة عبر التطبيق.',
  'لا يتحمل تطبيق عامل أي أضرار ناتجة عن استخدام مواد أو أدوات غير مناسبة من قبل الحرفي.',
  'يمنع الاتفاق المباشر خارج التطبيق بقصد تجاوز أنظمة أو عمولة الخدمة.',
  'يُعد هذا العقد نافذاً عند إتمام الموافقة عليه إلكترونياً من الطرفين عبر التطبيق.',
];

export default function WorkerContract() {
  const [photo, setPhoto] = useState<string>('');

  const handlePhoto = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  };

  return (
    <main className="contract-page">
      <div className="contract-toolbar no-print">
        <a href="/" className="back-link">← العودة</a>
        <div className="toolbar-actions">
          <button type="button" onClick={() => window.print()} className="print-btn">🖨️ طباعة العقد</button>
        </div>
      </div>

      <section className="contract-sheet">
        <header className="contract-header">
          <div className="brand-lockup">
            <div className="brand-mark">ع</div>
            <div>
              <div className="brand-name">عامل</div>
              <div className="brand-sub">تطبيقك للخدمات والحرفيين</div>
            </div>
          </div>
          <div className="header-message">
            <strong>معاً نبني مستقبلاً أفضل</strong>
            <span>خدمات موثوقة بأفضل الحرفيين</span>
          </div>
        </header>

        <div className="title-pill">
          <span className="title-icon">▤</span>
          <div>
            <h1>عقد عمل</h1>
            <p>بين تطبيق عامل والحرفي</p>
          </div>
        </div>

        <p className="intro">
          تم الاتفاق بين الطرف الأول <b>(تطبيق عامل)</b> والطرف الثاني <b>(الحرفي)</b> على التعاون والعمل المشترك وفقاً للشروط والأحكام التالية.
        </p>

        <div className="parties-grid">
          <section className="info-card">
            <div className="card-heading"><span>👤</span> بيانات الزبون</div>
            <Field label="الاسم الكامل" />
            <div className="two-fields"><Field label="العمر" /><Field label="رقم الهاتف" /></div>
            <Field label="المحافظة" placeholder="اختر المحافظة" />
            <Field label="المنطقة / القضاء" />
            <Field label="العنوان التفصيلي" />
            <Field label="المهنة" />
            <Field label="ملاحظات إضافية" />
          </section>

          <section className="photo-card">
            <div className="card-heading"><span>📷</span> صورة الحرفي</div>
            <label className="photo-drop" htmlFor="worker-photo">
              {photo ? <img src={photo} alt="صورة الحرفي" /> : <><span className="camera">◎</span><b>إضافة صورة الحرفي</b><small>الصورة الشخصية / الهوية</small></>}
            </label>
            <input className="no-print hidden-input" id="worker-photo" type="file" accept="image/*" onChange={handlePhoto} />
            <div className="extra-box">
              <b>معلومات إضافية</b>
              <p>يمكن إضافة تفاصيل أخرى مثل وقت العمل أو ملاحظات خاصة.</p>
              <div className="writing-lines" />
            </div>
          </section>

          <section className="info-card">
            <div className="card-heading"><span>🧰</span> بيانات الحرفي</div>
            <Field label="الاسم الكامل" />
            <div className="two-fields"><Field label="العمر" /><Field label="رقم الهاتف" /></div>
            <Field label="المهنة / التخصص" placeholder="اختر التخصص" />
            <Field label="المحافظة" placeholder="اختر المحافظة" />
            <Field label="المنطقة / القضاء" />
            <Field label="رقم الهوية" />
            <Field label="سنوات الخبرة" />
          </section>
        </div>

        <section className="wide-card">
          <div className="card-heading"><span>⚙</span> تفاصيل الخدمة</div>
          <div className="service-fields">
            <Field label="نوع الخدمة" placeholder="اختر الخدمة" />
            <Field label="تاريخ بدء العمل" placeholder="__/__/____" />
            <Field label="المدة المتوقعة للإنجاز" placeholder="مثال: 3 أيام" />
            <Field label="قيمة الأجر المتفق عليها" placeholder="مثال: 100,000 د.ع" />
          </div>
          <label className="textarea-label">وصف العمل المطلوب</label>
          <textarea aria-label="وصف العمل المطلوب" placeholder="اكتب تفاصيل العمل والمواد والملاحظات المتفق عليها..." />
        </section>

        <section className="wide-card terms-card">
          <div className="card-heading"><span>▤</span> شروط وأحكام العمل</div>
          <div className="terms-grid">
            {terms.map((term, index) => (
              <div className="term" key={term}>
                <span className="term-number">{index + 1}</span>
                <p>{term}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="agreement-note">
          وبناءً على ما تقدم، تم الاتفاق على هذا العقد بكامل الاحترام والتقدير، وتُعد البيانات المدخلة فيه جزءاً من اتفاق الخدمة.
        </div>

        <footer className="contract-footer">
          <div><b>عامل</b><span>خدمتكم شرف لنا</span></div>
          <div className="footer-center">معاً نبني مستقبلاً أفضل</div>
          <div><b>✓</b><span>عقد إلكتروني للخدمات</span></div>
        </footer>
      </section>
    </main>
  );
}

function Field({ label, placeholder = '' }: { label: string; placeholder?: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input placeholder={placeholder} />
    </label>
  );
}
