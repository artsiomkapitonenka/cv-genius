import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font,
  PDFViewer,
  PDFDownloadLink
} from '@react-pdf/renderer';
import { ResumeData } from '../../types/resume';

// Регистрируем шрифты
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ]
});

// Создаем стили для PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 0,
    fontFamily: 'Roboto',
  },
  sidebar: {
    width: '30%',
    backgroundColor: 'rgba(248,248,248,1)',
    padding: 20,
  },
  content: {
    width: '70%',
    padding: 20,
  },
  sectionHeading: {
    fontSize: 8,
    fontWeight: 700,
    color: '#c1272d',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  candidateName: {
    fontSize: 28,
    fontWeight: 400,
    marginBottom: 5,
  },
  candidateGrade: {
    fontSize: 13,
    fontWeight: 400,
    marginBottom: 20,
  },
  contentSection: {
    marginBottom: 20,
  },
  skillList: {
    marginBottom: 15,
  },
  skillItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  skillName: {
    fontSize: 8,
    fontWeight: 400,
  },
  skillRating: {
    flexDirection: 'row',
  },
  skillRatingDot: {
    fontSize: 7,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 8,
    color: '#c1272d',
  },
  bulletText: {
    fontSize: 8,
    flex: 1,
    marginBottom: 3,
  },
  educationItem: {
    marginBottom: 10,
  },
  educationDegree: {
    fontSize: 9,
    fontWeight: 600,
    marginBottom: 3,
  },
  educationInstitution: {
    fontSize: 8,
    fontWeight: 400,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  languageName: {
    fontSize: 8,
    fontWeight: 400,
  },
  languageLevel: {
    fontSize: 8,
    fontWeight: 500,
  },
  projectTitle: {
    fontSize: 10,
    fontWeight: 600,
    marginBottom: 5,
  },
  projectDescription: {
    fontSize: 8,
    fontWeight: 400,
    marginBottom: 10,
  },
  projectDetail: {
    marginBottom: 8,
  },
  projectDetailTitle: {
    fontSize: 9,
    fontWeight: 600,
    marginBottom: 3,
  },
  projectDetailText: {
    fontSize: 8,
    fontWeight: 400,
  },
  technologies: {
    fontSize: 8,
    marginTop: 2,
  },
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontSize: 9,
    fontWeight: 600,
    marginBottom: 3,
  },
  skillCategoryItems: {
    fontSize: 8,
    fontWeight: 400,
  }
});

// Компоненты для отдельных частей резюме
const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <Text style={styles.sectionHeading}>{children}</Text>
);

const BulletPoint = ({ children }: { children: React.ReactNode }) => (
  <View style={styles.bulletItem}>
    <Text style={styles.bulletPoint}>—</Text>
    <Text style={styles.bulletText}>{children}</Text>
  </View>
);

const SkillRating = ({ rating }: { rating: number }) => (
  <View style={styles.skillRating}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Text key={i} style={[styles.skillRatingDot, { color: i < rating ? '#c1272d' : '#d6d6d6' }]}>
        ●
      </Text>
    ))}
  </View>
);

// Основной компонент для PDF резюме
export const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Боковая панель */}
      <View style={styles.sidebar}>
        <SectionHeading>LEVEL OF EXPERIENCE</SectionHeading>
        <View style={styles.skillList}>
          {data.level_of_experience.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <SkillRating rating={skill.rating} />
            </View>
          ))}
        </View>

        {data.skills && data.skills.length > 0 && (
          <>
            <SectionHeading>OTHER SKILLS</SectionHeading>
            <View style={styles.skillList}>
              {data.skills.map((category, index) => (
                <View key={index} style={styles.skillCategory}>
                  <Text style={styles.skillCategoryTitle}>{category.category}</Text>
                  <Text style={styles.skillCategoryItems}>{category.items.join(', ')}</Text>
                </View>
              ))}
            </View>
          </>
        )}

        <SectionHeading>EDUCATION</SectionHeading>
        <View style={{ marginTop: 5 }}>
          {data.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <Text style={styles.educationDegree}>{edu.degree}</Text>
              <Text style={styles.educationInstitution}>{edu.institution}</Text>
            </View>
          ))}
        </View>

        <SectionHeading>LANGUAGES</SectionHeading>
        <View style={{ marginTop: 5 }}>
          {data.languages.map((lang, index) => (
            <View key={index} style={styles.languageItem}>
              <Text style={styles.languageName}>{lang.language}</Text>
              <Text style={styles.languageLevel}>{lang.level}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Основное содержимое */}
      <View style={styles.content}>
        <Text style={styles.candidateName}>{data.candidate.name}</Text>
        <Text style={styles.candidateGrade}>{data.candidate.grade}</Text>

        <View style={styles.contentSection}>
          <SectionHeading>CANDIDATE&apos;S OVERVIEW</SectionHeading>
          <View style={{ marginTop: 5 }}>
            {data.overview.map((item, index) => (
              <BulletPoint key={index}>{item}</BulletPoint>
            ))}
          </View>
        </View>

        <View style={styles.contentSection}>
          <SectionHeading>PROFESSIONAL EXPERIENCE</SectionHeading>
          <View style={{ marginTop: 5 }}>
            {data.projects.map((project, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <Text style={styles.projectTitle}>{project.title}</Text>
                <Text style={styles.projectDescription}>{project.description}</Text>

                <View style={styles.projectDetail}>
                  <Text style={styles.projectDetailTitle}>Position:</Text>
                  <Text style={styles.projectDetailText}>{project.position}</Text>
                </View>

                <View style={styles.projectDetail}>
                  <Text style={styles.projectDetailTitle}>Team Size:</Text>
                  <Text style={styles.projectDetailText}>{project.team_size}</Text>
                </View>

                <View style={styles.projectDetail}>
                  <Text style={styles.projectDetailTitle}>Responsibilities:</Text>
                  <View>
                    {project.responsibilities.map((responsibility, idx) => (
                      <BulletPoint key={idx}>{responsibility}</BulletPoint>
                    ))}
                  </View>
                </View>

                <View style={styles.projectDetail}>
                  <Text style={styles.projectDetailTitle}>Key Technologies:</Text>
                  <Text style={styles.technologies}>{project.technologies.join(', ')}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

// Компонент для просмотра PDF
export const ResumePDFViewer = ({ data }: { data: ResumeData }) => (
  <PDFViewer style={{ width: '100%', height: '80vh' }}>
    <ResumePDF data={data} />
  </PDFViewer>
);

// Компонент для скачивания PDF
export const ResumePDFDownloadLink = ({ data }: { data: ResumeData }) => (
  <PDFDownloadLink 
    document={<ResumePDF data={data} />} 
    fileName={`resume_${data.candidate.name.replace(/\s+/g, '_')}.pdf`}
    className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md font-medium transition-colors"
  >
    {({ loading }) => 
      loading ? 'Загрузка документа...' : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16" 
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
          Скачать PDF
        </>
      )
    }
  </PDFDownloadLink>
); 