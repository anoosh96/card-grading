import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf,
  Font,
} from '@react-pdf/renderer';
import { GradingData } from '@/app/(admin)/dashboard/types';
import { format } from 'date-fns'; // Or moment.js, dayjs


// Register Aptos font
Font.register({
  family: 'Aptos',
  fonts: [
    {
      src: '/fonts/Aptos/aptos.ttf',
      fontWeight: 'normal',
    },
    {
      src: '/fonts/Aptos/aptos-Bold.ttf',
      fontWeight: 'bold',
    },
    {
      src: '/fonts/Aptos/aptos-italic.ttf',
      fontWeight: 'normal',
    },
  ],
});

Font.register({
  family: 'DejaVuSans',
  src: '/fonts/dejavu-sans/DejaVuSans.ttf',
});

interface GradeInfo {
  grade: string;
  tier: string;
  stars: string;
}

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Aptos',
    fontSize: 11,
    lineHeight: 1.4,
    color: '#333333',
  },
  container: {
    flex: 1,
    border: '2px solid #cccccc',
    backgroundColor: '#ffffff',
  },

  // Header Section
  header: {
    backgroundColor: '#f8f8f8',
    borderBottom: '1px solid #cccccc',
    padding: 15,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 14,
    marginRight: 8,
    color: '#666666',
  },
  cardInfoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cardInfoRow: {
    display: 'flex',
    flexDirection: 'row',
    fontSize: 11,
    marginBottom: 4,
  },
  cardInfoLabel: {
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 6,
  },
  cardInfoValue: {
    color: '#666666',
  },

  // Content sections
  contentSection: {
    padding: 15,
    borderBottom: '1px solid #eeeeee',
  },

  // Final Grade Section
  finalGradeSection: {
    backgroundColor: '#f8f8f8',
    borderBottom: '1px solid #cccccc',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    fontSize: 14,
    marginRight: 8,
    color: '#666666',
  },
  gradeDetails: {
  },
  gradeRow: {
    fontSize: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 6,
  },
  gradeLabel: {
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 6
  },
  gradeValue: {
    color: '#333333',
  },
  stars: {
    color: '#ffa500',
    fontSize: 14,
    fontFamily: 'DejaVuSans',
  },
  scoreBox: {
    backgroundColor: '#e6f3ff',
    border: '1px solid #0066cc',
    paddingHorizontal: 8,
    paddingVertical: 3,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0066cc',
  },

  // AI Grading Summary Section
  summarySection: {
    backgroundColor: '#f8f8f8',
  },
  summaryText: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#555555',
  },

  // Table Section
  tableSection: {
    backgroundColor: '#f8f8f8',
  },
  table: {
    width: '100%',
    border: '1px solid #cccccc',
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e6e6e6',
    borderBottom: '1px solid #cccccc',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 11,
    gap: 10
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1px solid #eeeeee',
    padding: 10,
    fontSize: 11,
  },
  tableRowAlt: {
    backgroundColor: '#f9f9f9',
  },
  tableCellCategory: {
    width: '20%',
    fontWeight: 'bold',
    color: '#333333',
  },
  tableCellScore: {
    width: '20%',
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#0066cc',
  },
  tableCellComments: {
    width: '60%',
    color: '#555555',
  },

  // Justification Section
  justificationSection: {
    backgroundColor: '#f0f0f0',
  },
  justificationText: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#555555',
  },

  // Card Scan Section
  scanSection: {
    backgroundColor: '#f8f8f8',
  },
  scanNote: {
    fontSize: 10,
    // fontStyle: 'italic',
    color: '#666666',
    marginTop: 8,
  },

  // Authentication Section
  authSection: {
    backgroundColor: '#f8f8f8',
    borderTop: '1px solid #cccccc',
    padding: 15,
  },
  authRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  authIcon: {
    fontSize: 12,
    marginRight: 8,
    color: '#666666',
  },
  authLabel: {
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 11,
  },
  authValue: {
    fontSize: 11,
    color: '#333333',
  },

  // Images section (if needed)
  imagesContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 15,
    justifyContent: 'center',
  },
  imageSection: {
    flex: 1,
    maxWidth: 200,
    alignItems: 'center',
  },
  imageSectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333333',
  },
  cardImage: {
    width: 180,
    height: 250,
    objectFit: 'contain',
    border: '1px solid #cccccc',
  },
  imagePlaceholder: {
    width: 180,
    height: 250,
    backgroundColor: '#f5f5f5',
    border: '2px dashed #cccccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 10,
    color: '#999999',
    textAlign: 'center',
  },

  iconText: {
    width: '20px',
    height: '20px',
    marginRight: '5px'
  }
});

// Helper functions (same as before but updated for new design)
const getGradeInfo = (score: number): GradeInfo => {
  if (score >= 9.5) {
    return {
      grade: '★★★★★ Pristine',
      tier: 'Tier 1 (Premium Collector Quality)',
      stars: '★★★★★',
    };
  } else if (score >= 9.0) {
    return {
      grade: '★★★★★ Mint',
      tier: 'Tier 1 (Premium Collector Quality)',
      stars: '★★★★★',
    };
  } else if (score >= 8.0) {
    return {
      grade: '★★★★☆ Near Mint (NM)',
      tier: 'Tier 2 (High Collector Quality)',
      stars: '★★★★☆',
    };
  } else if (score >= 7.0) {
    return {
      grade: '★★★☆☆ Excellent',
      tier: 'Tier 3 (Good Collector Quality)',
      stars: '★★★☆☆',
    };
  } else {
    return {
      grade: '★★☆☆☆ Good',
      tier: 'Tier 4 (Fair Collector Quality)',
      stars: '★★☆☆☆',
    };
  }
};

const generateAuthCode = (cardName: string, grade: string): string => {
  const gradeCode = grade.includes('Near Mint') ? 'NM' : grade.split(' ')[1]?.toUpperCase() || 'GRD';
  const cardCode = cardName.substring(0, 3).toUpperCase();
  const dateCode = new Date().toISOString().slice(2, 10).replace(/-/g, '');
  return `PCM-AI-${gradeCode}-${cardCode}-${dateCode}`;
};

const generateReportId = (cardName: string): string => {
  const dateCode = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const cardCode = cardName.split(' ')[0].toUpperCase();
  return `#${dateCode}-${cardCode}-001`;
};

// Main PDF Document Component
const GradingReportPDF: React.FC<{ cardData: GradingData }> = ({ cardData }) => {
  const gradeInfo = getGradeInfo(Number(cardData.final_score || 0));
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const authCode = generateAuthCode(cardData.card_name || 'Unknown', gradeInfo.grade);
  const reportId = generateReportId(cardData.card_name || 'Unknown');

  const conditionCategories = [
    { key: 'corners', label: 'Corners' },
    { key: 'edges', label: 'Edges' },
    { key: 'surface', label: 'Surface' },
    { key: 'centering', label: 'Centering' },
  ];

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap={false}>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTitle}>
              <Image style={styles.iconText} src={"/pdf-icons/mingcute_paper-line.png"} />
              <Text>AI Card Grading Report</Text>
            </View>
            <View>
              <View style={styles.cardInfoRow}>
                <Text style={styles.cardInfoLabel}>Card Name:</Text>
                <Text style={styles.cardInfoValue}>{cardData.card_name || 'N/A'}</Text>
              </View>
              <View style={styles.cardInfoRow}>
                <Text style={styles.cardInfoLabel}>Grading Date:</Text>
                <Text style={styles.cardInfoValue}>{ format(new Date(cardData.grading_date), 'dd-MM-yyyy') || currentDate}</Text>
              </View>
              <View style={styles.cardInfoRow}>
                <Text style={styles.cardInfoLabel}>Card Number:</Text>
                <Text style={styles.cardInfoValue}>{cardData.card_number || 'N/A'}</Text>
              </View>
              <View style={styles.cardInfoRow}>
                <Text style={styles.cardInfoLabel}>Graded by:</Text>
                <Text style={styles.cardInfoValue}>{cardData.graded_by || 'PrecisionGrading™'}</Text>
              </View>
            </View>
          </View>

          {/* Final Grade */}
          <View style={[styles.contentSection, styles.finalGradeSection]}>
            <View style={styles.sectionTitle}>
              <Image style={styles.iconText} src={"/pdf-icons/grade1.png"} />
              <Text>Final Grade</Text>
            </View>
            <View style={styles.gradeDetails}>
              <View style={styles.gradeRow}>
                <Text style={styles.gradeLabel}>Grade:</Text>
                <Text style={styles.stars}>{cardData.grade || gradeInfo.grade}</Text>
              </View>
              <View style={styles.gradeRow}>
                <Text style={styles.gradeLabel}>AI Score:</Text>
                <Text style={styles.scoreBox}>
                  {Number(cardData.final_score || 0).toFixed(1)} / 10
                </Text>
              </View>
              <View style={styles.gradeRow}>
                <Text style={styles.gradeLabel}>Condition Tier:</Text>
                <Text style={styles.gradeValue}>{cardData.condition_tier || gradeInfo.tier}</Text>
              </View>
            </View>
          </View>

          {/* AI Grading Summary */}
          <View style={[styles.contentSection, styles.summarySection]}>
            <View style={styles.sectionTitle}>
              <Image style={styles.iconText} src={"/pdf-icons/hugeicons_brain.png"} />
              <Text>AI Grading Summary</Text>
            </View>
            <Text style={styles.summaryText}>
              {cardData.ai_summary ||
                'Our AI-powered grading engine evaluates each card using ultra-high resolution imaging and precision scoring across four key areas: Corners, Edges, Surface, and Centering.'}
            </Text>
          </View>

          {/* Detailed Condition Breakdown */}
          <View style={[styles.contentSection, styles.tableSection]}>
            <View style={styles.sectionTitle}>
              <Image style={styles.iconText} src={"/pdf-icons/iconamoon_search-light.png"} />
              <Text>Detailed Condition Breakdown</Text>
            </View>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableCellCategory}>Category</Text>
                <Text style={styles.tableCellScore}>AI Score (out of 10)</Text>
                <Text style={styles.tableCellComments}>Comments</Text>
              </View>
              {conditionCategories.map((category) => {
                const data = cardData.condition_breakdown?.[
                  category.key as keyof typeof cardData.condition_breakdown
                ];
                return (
                  <View
                    key={category.key}
                    style={[styles.tableRow]}
                  >
                    <Text style={styles.tableCellCategory}>{category.label}</Text>
                    <Text style={styles.tableCellScore}>
                      {data?.score?.toFixed(1) || 'N/A'}
                    </Text>
                    <Text style={styles.tableCellComments}>
                      {data?.comments || 'No comments available'}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Final Grade Justification */}
          <View style={[styles.contentSection, styles.justificationSection]}>
            <View style={styles.sectionTitle}>
              <Image style={styles.iconText} src={"/pdf-icons/lets-icons_paper.png"} />
              <Text>Final Grade Justification</Text>
            </View>
            <Text style={styles.justificationText}>
              {cardData.overall_justification ||
                'This card meets the criteria for Near Mint based on detailed AI inspection. The card shows only minor cosmetic flaws, with edge and corner wear visible under magnification. The surface remains clean with a light scratch that does not affect visual appeal or structural integrity. Centering is well above average.\n\nWhile extremely close to Mint condition, the slight imperfections place this card in Tier 2 Near Mint, making it an excellent choice for collectors or high-end casual play.'}
            </Text>
          </View>

          {/* Card Scan Reference */}
          <View style={[styles.contentSection, styles.scanSection]}>
            <View style={styles.sectionTitle}>
              <Image style={styles.iconText} src={"/pdf-icons/solar_camera-broken.png"} />
              <Text>Card Scan Reference</Text>
            </View>
            <Text style={styles.scanNote}>
              (High-resolution front and back scans inserted here with zoom capability)
            </Text>

            {/* Optional: Include actual images if available */}
            {(cardData.frontImage || cardData.backImage) && (
              <View style={styles.imagesContainer}>
                {cardData.frontImage && (
                  <View style={styles.imageSection}>
                    <Text style={styles.imageSectionTitle}>Front Side</Text>
                    <Image style={styles.cardImage} src={cardData.frontImage} />
                  </View>
                )}
                {cardData.backImage && (
                  <View style={styles.imageSection}>
                    <Text style={styles.imageSectionTitle}>Back Side</Text>
                    <Image style={styles.cardImage} src={cardData.backImage} />
                  </View>
                )}
              </View>
            )}
          </View>

          {/* Authentication Footer */}
          <View style={styles.authSection}>
            <View style={styles.authRow}>
              <Image style={styles.iconText} src={"/pdf-icons/ic_outline-lock.png"} />
              <Text style={styles.authLabel}>Authentication Code:</Text>
              <Text style={styles.authValue}>{authCode}</Text>
            </View>
            <View style={styles.authRow}>
              <Text style={styles.authLabel}>Report ID:</Text>
              <Text style={styles.authValue}>{reportId}</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

// PDF Generator Class (same as before)
export class ReactPDFGenerator {
  async generatePDF(cardData: GradingData, filename?: string, download = false): Promise<Blob> {
    try {
      console.log('Starting PDF generation with React PDF...');
      console.log('Card data:', JSON.stringify(cardData, null, 2));

      // Validate cardData
      if (!cardData.final_score || isNaN(Number(cardData.final_score))) {
        console.warn('Invalid final_score, defaulting to 0');
        cardData.final_score = '0';
      }
      if (!cardData.condition_breakdown) {
        console.warn('Missing condition_breakdown, defaulting to empty object');
        cardData.condition_breakdown = {
          corners: { score: 0, comments: '' },
          edges: { score: 0, comments: '' },
          surface: { score: 0, comments: '' },
          centering: { score: 0, comments: '' },
        };
      }

      const blob = await pdf(<GradingReportPDF cardData={cardData} />).toBlob();

      if (download) {

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download =
          filename ||
          `grading-report-${cardData.card_name?.replace(/\s+/g, '-') || 'report'}-${Date.now()}.pdf`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }

      return blob;

    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error(`PDF generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generatePDFBlob(cardData: GradingData): Promise<Blob> {
    try {
      const blob = await pdf(<GradingReportPDF cardData={cardData} />).toBlob();
      return blob;
    } catch (error) {
      console.error('Error generating PDF blob:', error);
      throw new Error(`PDF blob generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async generatePDFBase64(cardData: GradingData): Promise<string> {
    try {
      const blob = await this.generatePDFBlob(cardData);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const base64 = reader.result as string;
          resolve(base64.split(',')[1]);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error generating PDF base64:', error);
      throw new Error(`PDF base64 generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const reactPDFGenerator = new ReactPDFGenerator();