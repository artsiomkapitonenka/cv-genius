import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font,
  PDFViewer,
  PDFDownloadLink,
  Svg,
  Path
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
    marginBottom: 8,
    alignItems: 'center',
    paddingRight: 2,
  },
  skillName: {
    fontSize: 8,
    fontWeight: 400,
    width: '65%',
    flexWrap: 'wrap',
  },
  skillRating: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '35%',
    justifyContent: 'flex-end',
    marginTop: 0,
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
  },
  logoContainer: {
    marginBottom: 15,
  },
  logo: {
    width: 87,
    height: 24,
  },
  contactInfo: {
    fontSize: 9,
    fontWeight: 300,
    marginTop: 5,
    marginBottom: 15,
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

// Компонент для логотипа напрямую в SVG
const Logo = () => (
  <Svg viewBox="0 0 88 24" width={88} height={24}>
    <Path d="M62.0975 0H64.243V2.15142H62.0975V0ZM81.1168 5.05875C82.7549 5.00061 84.277 5.69836 85.3497 6.89037C86.4805 8.2132 87.1183 9.87038 87.0603 11.5712C87.0603 11.6293 87.0603 11.891 87.0023 12.3998H77.1448C77.2752 14.682 79.1598 16.3828 81.4357 16.3247C82.8853 16.3247 84.219 15.7577 85.2918 14.7983L86.4225 16.3247C85.0308 17.5893 83.1318 18.2871 81.2473 18.229C79.5367 18.2871 77.8986 17.662 76.6954 16.3973C75.4922 15.1326 74.8688 13.4173 74.9268 11.6439C74.8688 9.87038 75.4922 8.15506 76.6954 6.89037C77.8261 5.69836 79.4642 5.05875 81.1168 5.05875ZM81.1168 6.96305C80.102 6.9049 79.1598 7.28286 78.4639 7.98062C77.7681 8.67838 77.3332 9.62326 77.2028 10.6408H84.9004C84.8424 9.62326 84.393 8.67838 83.6972 7.98062C82.9433 7.341 82.0591 6.96305 81.1168 6.96305ZM71.2592 18.2435H69.1138V0H71.2592V18.2435ZM1.96635 7.22471C3.22754 5.96003 4.93812 5.26227 6.70668 5.32041C8.47524 5.26227 10.1858 5.96003 11.447 7.22471C12.7082 8.43126 13.404 10.132 13.346 11.9055C13.404 13.679 12.7082 15.3943 11.447 16.5863C10.1858 17.851 8.47524 18.5488 6.70668 18.4906C4.93812 18.5488 3.22754 17.851 1.96635 16.5863C0.705164 15.3798 0.0093353 13.679 0.067321 11.9055C0.0093353 10.132 0.705164 8.41672 1.96635 7.22471ZM6.70668 7.341C5.50348 7.28286 4.37276 7.77711 3.54646 8.6057C2.72017 9.49243 2.22729 10.6263 2.28527 11.8328C2.22729 13.0394 2.72017 14.2459 3.54646 15.06C4.37276 15.874 5.50348 16.3828 6.70668 16.3247C7.90988 16.3828 9.0406 15.8886 9.8669 15.06C10.6932 14.1732 11.1861 13.0394 11.1281 11.8328C11.1861 10.6263 10.6932 9.41975 9.8669 8.6057C9.0406 7.79164 7.90988 7.341 6.70668 7.341ZM41.1357 18.2435H38.9902V16.5282C37.9175 17.7929 36.2794 18.5488 34.5688 18.4906C32.8582 18.5488 31.2201 17.851 30.0894 16.5863C28.8862 15.3216 28.1904 13.6063 28.2629 11.9055C28.2049 10.132 28.8282 8.4894 30.0894 7.22471C31.2201 6.01817 32.8727 5.32041 34.5688 5.3931C36.2794 5.33495 37.9175 6.03271 38.9902 7.35554V5.58207H41.1357V18.2435ZM34.8152 7.341C33.612 7.28286 32.4813 7.77711 31.655 8.66384C30.8287 9.55058 30.3938 10.6844 30.4518 11.891C30.4518 13.0975 30.8867 14.2314 31.713 15.1181C33.4236 16.8334 36.1924 16.8334 37.903 15.1181C38.7293 14.2314 39.1642 13.0975 39.1062 11.891C39.1642 10.6844 38.7293 9.55058 37.903 8.66384C37.0912 7.79164 35.946 7.341 34.8152 7.341ZM64.243 18.2435H62.0975V5.58207H64.243V18.2435ZM50.9787 5.32041C52.6893 5.26227 54.2694 5.96003 55.3422 7.28286V5.56754H57.4876V17.2841C57.6181 19.0575 56.9223 20.7729 55.6611 21.9649C54.3419 23.1714 52.5733 23.7383 50.8048 23.6802C47.775 23.6802 46.3254 22.7353 46.3254 22.7353L47.5866 21.0927C48.6013 21.6015 49.6741 21.7904 50.8048 21.7904C52.008 21.8486 53.2112 21.4706 54.0955 20.6566C54.9218 19.828 55.3567 18.6941 55.2987 17.4876V16.3537C54.2839 17.6766 52.6458 18.3743 50.9352 18.3162C49.2972 18.3743 47.6446 17.6766 46.4559 16.4846C45.2527 15.2199 44.6293 13.5772 44.6873 11.8038C44.6293 10.0884 45.2527 8.38764 46.4559 7.12296C47.7025 5.94549 49.3406 5.24773 50.9787 5.32041ZM51.2397 7.341C50.109 7.28286 48.9637 7.77711 48.1519 8.6057C47.3256 9.49243 46.9487 10.6263 46.9487 11.7747C46.8907 12.9085 47.3256 14.0569 48.1519 14.9437C49.8625 16.659 52.5733 16.659 54.2839 14.9437C55.1102 14.1151 55.5451 12.9812 55.4871 11.7747C55.5451 10.5681 55.1102 9.43428 54.2839 8.6057C53.5156 7.79164 52.4429 7.341 51.2397 7.341Z" fill="black" />
    <Path d="M31.1476 0H28.4948L19.3331 11.9055L24.2618 18.2435H26.9147L21.9279 11.7165L31.1476 0Z" fill="black" />
    <Path d="M14.3463 5.56754H16.9991L21.9279 11.7165L12.4473 24H9.80891L19.3476 11.9055L14.3463 5.56754Z" fill="#C1272D" />
  </Svg>
);

// Основной компонент для PDF резюме
export const ResumePDF = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Боковая панель */}
      <View style={styles.sidebar}>
        {/* Логотип и контактная информация */}
        <View style={styles.logoContainer}>
          <Logo />
          <Text style={styles.contactInfo}>sales@oxagile.com</Text>
        </View>

        <SectionHeading>LEVEL OF EXPERIENCE</SectionHeading>
        <View style={styles.skillList}>
          {data.level_of_experience.map((skill, index) => (
            <View key={index} style={styles.skillItem}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <View style={styles.skillRating}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Svg key={i} width={5} height={5} viewBox="0 0 5 5" style={{ marginRight: i < 4 ? 3 : 0, marginTop: 1 }}>
                    <Path
                      d="M2.5 5C3.88 5 5 3.88 5 2.5C5 1.12 3.88 0 2.5 0C1.12 0 0 1.12 0 2.5C0 3.88 1.12 5 2.5 5Z"
                      fill={i < skill.rating ? '#c1272d' : '#d6d6d6'}
                    />
                  </Svg>
                ))}
              </View>
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
                  <Text style={styles.technologies}>
                    {Array.isArray(project.technologies) 
                      ? project.technologies.join(', ')
                      : (project.technologies || '')}
                  </Text>
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