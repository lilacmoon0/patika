import styled from 'styled-components';

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
`;

const MainTitle = styled.h1`
  color: #2c3e50;
  border-bottom: 3px solid #3498db;
  padding-bottom: 10px;
`;

const IntroSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-top: 30px;
`;

const FormulaBox = styled.div`
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const FormulaText = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
`;

const TableContainer = styled.div`
  margin-bottom: 30px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ddd;
`;

const TableHeader = styled.thead`
  tr {
    background-color: #3498db;
    color: white;
  }
`;

const TableHeaderCell = styled.th`
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
`;

const TableRow = styled.tr`
  ${props => props.alternate && `background-color: #f8f9fa;`}
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  ${props => props.color && `color: ${props.color};`}
  ${props => props.bold && `font-weight: bold;`}
`;

const ScienceSection = styled.div`
  margin-bottom: 30px;
`;

const ScienceList = styled.ul`
  padding-left: 20px;
`;

const LimitationsBox = styled.div`
  background-color: #fff3cd;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 30px;
  border: 1px solid #ffeaa7;
`;

const LimitationsTitle = styled.h3`
  margin-top: 0;
  color: #856404;
`;

const LimitationsList = styled.ul`
  padding-left: 20px;
  margin: 0;
`;

const UsageBox = styled.div`
  background-color: #d4edda;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 30px;
  border: 1px solid #c3e6cb;
`;

const UsageText = styled.p`
  margin: 0 0 10px 0;
`;

const UsageList = styled.ul`
  padding-left: 20px;
  margin: 0;
`;

const DisclaimerContainer = styled.div`
  text-align: center;
  margin-top: 30px;
`;

const DisclaimerText = styled.p`
  font-size: 14px;
  color: #6c757d;
  font-style: italic;
`;

export const Info = () => {
  return (
    <Container>
      <MainTitle>
        What is BMI (Body Mass Index)?
      </MainTitle>
      
      <IntroSection>
        <p>
          Body Mass Index (BMI) is a widely used screening tool that measures body fat based on your height and weight. 
          It provides a simple numeric measure to categorize individuals as underweight, normal weight, overweight, or obese.
        </p>
        <p>
          BMI was developed by Belgian mathematician Adolphe Quetelet in the 1830s and is sometimes called the Quetelet Index.
        </p>
      </IntroSection>

      <SectionTitle>How is BMI Calculated?</SectionTitle>
      <FormulaBox>
        <h3>Formula:</h3>
        <FormulaText>
          BMI = Weight (kg) ÷ Height² (m²)
        </FormulaText>
        <p>Or in Imperial units:</p>
        <FormulaText>
          BMI = (Weight (lbs) ÷ Height² (inches²)) × 703
        </FormulaText>
      </FormulaBox>

      <SectionTitle>BMI Categories</SectionTitle>
      <TableContainer>
        <StyledTable>
          <TableHeader>
            <tr>
              <TableHeaderCell>BMI Range</TableHeaderCell>
              <TableHeaderCell>Category</TableHeaderCell>
              <TableHeaderCell>Health Risk</TableHeaderCell>
            </tr>
          </TableHeader>
          <tbody>
            <TableRow>
              <TableCell>Below 18.5</TableCell>
              <TableCell color="#3498db" bold>Underweight</TableCell>
              <TableCell>Increased risk of malnutrition, osteoporosis</TableCell>
            </TableRow>
            <TableRow alternate>
              <TableCell>18.5 - 24.9</TableCell>
              <TableCell color="#27ae60" bold>Normal Weight</TableCell>
              <TableCell>Lowest health risk</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>25.0 - 29.9</TableCell>
              <TableCell color="#f39c12" bold>Overweight</TableCell>
              <TableCell>Increased risk of heart disease, diabetes</TableCell>
            </TableRow>
            <TableRow alternate>
              <TableCell>30.0 and above</TableCell>
              <TableCell color="#e74c3c" bold>Obese</TableCell>
              <TableCell>High risk of serious health conditions</TableCell>
            </TableRow>
          </tbody>
        </StyledTable>
      </TableContainer>

      <SectionTitle>How BMI Works</SectionTitle>
      <ScienceSection>
        <h3>The Science Behind BMI:</h3>
        <ScienceList>
          <li><strong>Height-Weight Relationship:</strong> BMI assumes that weight increases proportionally with the square of height</li>
          <li><strong>Population Screening:</strong> It's designed for population-level health assessments rather than individual diagnosis</li>
          <li><strong>Body Fat Estimation:</strong> Higher BMI generally correlates with higher body fat percentage</li>
          <li><strong>Health Risk Indicator:</strong> BMI categories are associated with different levels of health risks</li>
        </ScienceList>
      </ScienceSection>

      <SectionTitle>Limitations of BMI</SectionTitle>
      <LimitationsBox>
        <LimitationsTitle>Important Considerations:</LimitationsTitle>
        <LimitationsList>
          <li><strong>Muscle vs. Fat:</strong> BMI doesn't distinguish between muscle and fat mass</li>
          <li><strong>Age Factor:</strong> Body composition changes with age</li>
          <li><strong>Gender Differences:</strong> Men and women have different body fat distributions</li>
          <li><strong>Ethnicity:</strong> Different ethnic groups may have varying health risks at the same BMI</li>
          <li><strong>Overall Health:</strong> BMI doesn't consider other health factors like fitness level or medical history</li>
        </LimitationsList>
      </LimitationsBox>

      <SectionTitle>Using This BMI Calculator</SectionTitle>
      <UsageBox>
        <UsageText>
          <strong>This application helps you:</strong>
        </UsageText>
        <UsageList>
          <li>Calculate your BMI quickly and accurately</li>
          <li>Understand what your BMI means for your health</li>
          <li>Track your BMI history over time</li>
          <li>Monitor your progress toward health goals</li>
        </UsageList>
      </UsageBox>

      <DisclaimerContainer>
        <DisclaimerText>
          <strong>Disclaimer:</strong> BMI is a screening tool and should not replace professional medical advice. 
          Always consult with healthcare providers for personalized health assessments and recommendations.
        </DisclaimerText>
      </DisclaimerContainer>
    </Container>
  );
}