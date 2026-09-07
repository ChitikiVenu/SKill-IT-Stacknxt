import {jsPDF} from 'jspdf';
import {faqs as generalFaqs} from '../data/content';
import {courseTracks} from '../data/coursesData';

const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN = 18;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;

const COLORS = {
    royal: [37, 99, 235],
    ink: [15, 23, 42],
    slate: [71, 85, 105],
    mint: [13, 194, 137],
    white: [255, 255, 255],
};

function newDoc() {
    return new jsPDF({unit: 'mm', format: 'a4'});
}

function drawFooter(doc, pageLabel) {
    doc.setDrawColor(...COLORS.slate);
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.slate);
    doc.text(
        'Skill IT Education · Madhapur, Hyderabad · hello@skilliteducation.com · +91 91777 15978',
        MARGIN,
        PAGE_HEIGHT - 10,
    );
    doc.text(pageLabel, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 10, {
        align: 'right',
    });
}

function ensureSpace(doc, cursor, needed, pageLabel) {
    if (cursor.y + needed > PAGE_HEIGHT - 18) {
        drawFooter(doc, pageLabel());
        doc.addPage();
        cursor.y = MARGIN;
        return true;
    }
    return false;
}

function addHeading(doc, cursor, text, pageLabel) {
    ensureSpace(doc, cursor, 12, pageLabel);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(...COLORS.royal);
    doc.text(text, MARGIN, cursor.y);
    cursor.y += 3;
    doc.setDrawColor(...COLORS.royal);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, cursor.y, MARGIN + 24, cursor.y);
    cursor.y += 7;
}

function addParagraph(doc, cursor, text, pageLabel) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.slate);
    const lines = doc.splitTextToSize(text, CONTENT_WIDTH);
    ensureSpace(doc, cursor, lines.length * 5 + 4, pageLabel);
    doc.text(lines, MARGIN, cursor.y);
    cursor.y += lines.length * 5 + 4;
}

function addBullets(doc, cursor, items, pageLabel) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.ink);
    items.forEach((item) => {
        const lines = doc.splitTextToSize(item, CONTENT_WIDTH - 6);
        ensureSpace(doc, cursor, lines.length * 5 + 2, pageLabel);
        doc.setTextColor(...COLORS.mint);
        doc.text('•', MARGIN, cursor.y);
        doc.setTextColor(...COLORS.ink);
        doc.text(lines, MARGIN + 5, cursor.y);
        cursor.y += lines.length * 5 + 2;
    });
    cursor.y += 3;
}

function addHeroBand(doc, title, subtitle) {
    doc.setFillColor(...COLORS.royal);
    doc.rect(0, 0, PAGE_WIDTH, 48, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(...COLORS.white);
    doc.text('Skill IT EDUCATION', MARGIN, 16);
    doc.setFontSize(20);
    const titleLines = doc.splitTextToSize(title, CONTENT_WIDTH);
    doc.text(titleLines, MARGIN, 28);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const subLines = doc.splitTextToSize(subtitle, CONTENT_WIDTH);
    doc.text(subLines, MARGIN, 28 + titleLines.length * 7 + 4);
}

function addFactRow(doc, cursor, facts, pageLabel) {
    ensureSpace(doc, cursor, 10, pageLabel);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    const colWidth = CONTENT_WIDTH / facts.length;
    facts.forEach((fact, index) => {
        const x = MARGIN + index * colWidth;
        doc.setTextColor(...COLORS.slate);
        doc.text(fact.label.toUpperCase(), x, cursor.y);
        doc.setTextColor(...COLORS.ink);
        doc.setFontSize(11);
        doc.text(fact.value, x, cursor.y + 6);
        doc.setFontSize(9);
    });
    cursor.y += 14;
}

function downloadStaticFile(url, filename) {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function downloadModuleBrochure(track) {
    if (track.brochureFile) {
        downloadStaticFile(
            track.brochureFile,
            `skill-it-education-${track.slug}-brochure.pdf`,
        );
        return;
    }
    generateModuleBrochure(track);
}

export function generateModuleBrochure(track) {
    const doc = newDoc();
    const cursor = {y: 60};
    const pageLabel = () => `${track.title} Brochure`;

    addHeroBand(doc, track.hero.headline, track.tagline);
    cursor.y = 58;

    addFactRow(
        doc,
        cursor,
        [
            {label: 'Duration', value: `${track.duration} (${track.hours})`},
            {label: 'Level', value: track.level},
            {label: 'Delivery', value: 'Online / Classroom / Blended'},
        ],
        pageLabel,
    );

    addHeading(doc, cursor, 'Programme Overview', pageLabel);
    addParagraph(doc, cursor, track.overview.body, pageLabel);
    addBullets(doc, cursor, track.overview.bullets, pageLabel);

    addHeading(doc, cursor, 'Why Choose This Programme', pageLabel);
    addBullets(
        doc,
        cursor,
        [...track.whyChoose.columnA, ...track.whyChoose.columnB],
        pageLabel,
    );

    addHeading(doc, cursor, 'Key Highlights', pageLabel);
    track.highlights.forEach((highlight) => {
        ensureSpace(doc, cursor, 8, pageLabel);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(...COLORS.royal);
        doc.text(highlight.tab, MARGIN, cursor.y);
        cursor.y += 5;
        addBullets(doc, cursor, highlight.bullets, pageLabel);
    });

    addHeading(doc, cursor, 'Capstone', pageLabel);
    addParagraph(doc, cursor, track.capstone, pageLabel);

    addHeading(doc, cursor, 'Frequently Asked Questions', pageLabel);
    track.faqs.slice(0, 5).forEach((faq) => {
        ensureSpace(doc, cursor, 8, pageLabel);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setTextColor(...COLORS.ink);
        const qLines = doc.splitTextToSize(faq.question, CONTENT_WIDTH);
        doc.text(qLines, MARGIN, cursor.y);
        cursor.y += qLines.length * 5 + 2;
        addParagraph(doc, cursor, faq.answer, pageLabel);
    });

    drawFooter(doc, pageLabel());
    doc.save(`skill-it-education-${track.slug}-brochure.pdf`);
}

export function generateMasterBrochure() {
    const doc = newDoc();
    const cursor = {y: 60};
    const pageLabel = () => 'Master Brochure';

    addHeroBand(
        doc,
        'Skill IT Education',
        'Unified Master Brochure — All Programmes, Hyderabad',
    );
    cursor.y = 58;

    addHeading(doc, cursor, 'About Skill IT Education', pageLabel);
    addParagraph(
        doc,
        cursor,
        'Skill IT Education is a Hyderabad-based EdTech platform offering job-ready Cyber Security, AI Engineer, Data Science, SOC Analyst, and Generative AI programmes with live mentorship, hands-on labs, and dedicated placement support.',
        pageLabel,
    );

    addHeading(doc, cursor, 'Hyderabad Training Center', pageLabel);
    addParagraph(
        doc,
        cursor,
        'Our classroom center is located in Madhapur, Hyderabad. Every programme is available online, in-classroom, or blended.',
        pageLabel,
    );

    addHeading(doc, cursor, 'Payment Plans', pageLabel);
    addBullets(
        doc,
        cursor,
        [
            'EMI, part-payment, and full-payment options available on every programme.',
            'Speak with our admissions team for current fee details and scholarship eligibility.',
        ],
        pageLabel,
    );

    addHeading(doc, cursor, 'Placement Support', pageLabel);
    addBullets(
        doc,
        cursor,
        generalFaqs
            .filter((f) => f.id === 'faq-placement')
            .map((f) => f.answer),
        pageLabel,
    );

    courseTracks.forEach((track) => {
        drawFooter(doc, pageLabel());
        doc.addPage();
        cursor.y = MARGIN;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.setTextColor(...COLORS.royal);
        doc.text(track.title, MARGIN, cursor.y);
        cursor.y += 9;

        addFactRow(
            doc,
            cursor,
            [
                {
                    label: 'Duration',
                    value: `${track.duration} (${track.hours})`,
                },
                {label: 'Level', value: track.level},
                {label: 'Delivery', value: 'Online / Classroom / Blended'},
            ],
            pageLabel,
        );

        addParagraph(doc, cursor, track.tagline, pageLabel);
        addHeading(doc, cursor, 'Why Choose This Programme', pageLabel);
        addBullets(
            doc,
            cursor,
            [
                ...track.whyChoose.columnA.slice(0, 3),
                ...track.whyChoose.columnB.slice(0, 2),
            ],
            pageLabel,
        );
        addHeading(doc, cursor, 'Capstone', pageLabel);
        addParagraph(doc, cursor, track.capstone, pageLabel);
    });

    drawFooter(doc, pageLabel());
    doc.save('skill-it-education-master-brochure.pdf');
}
