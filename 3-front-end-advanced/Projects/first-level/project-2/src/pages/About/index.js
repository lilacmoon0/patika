import React from 'react';
import styled from 'styled-components';

const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  background: linear-gradient(135deg, #FFE5E5 0%, #FFD6E8 25%, #E8D5FF 50%, #D5E8FF 75%, #D5FFE8 100%);
  min-height: 100vh;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 218, 235, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(221, 160, 221, 0.2) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: 60px;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 60px 40px;
  box-shadow: 0 15px 35px rgba(255, 105, 180, 0.2);
  border: 2px solid rgba(255, 192, 203, 0.3);
`;

const MainTitle = styled.h1`
  font-size: 3.5rem;
  background: linear-gradient(45deg, #FF69B4, #DDA0DD, #87CEEB);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
  font-weight: bold;
  text-shadow: 0 2px 10px rgba(255, 105, 180, 0.3);
  
  &::after {
    content: '✨💖✨';
    display: block;
    font-size: 2rem;
    margin-top: 15px;
    animation: sparkle 2s ease-in-out infinite;
  }
  
  @keyframes sparkle {
    0%, 100% { opacity: 0.7; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.1); }
  }
`;

const Subtitle = styled.p`
  font-size: 1.4rem;
  color: #8B4A9C;
  margin-bottom: 40px;
  line-height: 1.6;
  font-weight: 500;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 10px 25px rgba(255, 105, 180, 0.15);
  border: 2px solid rgba(255, 192, 203, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(255, 105, 180, 0.25);
    border-color: rgba(255, 105, 180, 0.5);
  }

`;

const CardIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
  text-align: center;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  color: #8B4A9C;
  margin-bottom: 15px;
  text-align: center;
  font-weight: 600;
`;

const CardContent = styled.p`
  color: #555;
  line-height: 1.7;
  font-size: 1rem;
  text-align: center;
`;

const StatsSection = styled.section`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 50px 30px;
  margin-bottom: 50px;
  box-shadow: 0 15px 35px rgba(255, 105, 180, 0.2);
  border: 2px solid rgba(255, 192, 203, 0.3);
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  text-align: center;
`;

const StatItem = styled.div`
  padding: 20px;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: bold;
  color: #FF69B4;
  margin-bottom: 10px;
  text-shadow: 0 2px 10px rgba(255, 105, 180, 0.3);
`;

const StatLabel = styled.div`
  font-size: 1.1rem;
  color: #8B4A9C;
  font-weight: 600;
`;

const TeamSection = styled.section`
  text-align: center;
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #8B4A9C;
  margin-bottom: 40px;
  font-weight: bold;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
`;

const TeamCard = styled.div`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 10px 25px rgba(255, 105, 180, 0.15);
  border: 2px solid rgba(255, 192, 203, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(255, 105, 180, 0.25);
  }
`;

const TeamAvatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: linear-gradient(45deg, #FF69B4, #FFB6C1);
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  box-shadow: 0 8px 20px rgba(255, 105, 180, 0.3);
`;

const TeamName = styled.h4`
  font-size: 1.3rem;
  color: #8B4A9C;
  margin-bottom: 10px;
  font-weight: 600;
`;

const TeamRole = styled.p`
  color: #FF69B4;
  font-weight: 500;
  margin-bottom: 15px;
  font-size: 1rem;
`;

const TeamDescription = styled.p`
  color: #666;
  line-height: 1.6;
  font-size: 0.95rem;
`;

const ContactSection = styled.section`
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 50px 40px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(255, 105, 180, 0.2);
  border: 2px solid rgba(255, 192, 203, 0.3);
`;

const ContactInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
`;

const ContactItem = styled.div`
  padding: 20px;
  border-radius: 15px;
  background: rgba(255, 182, 193, 0.1);
  border: 1px solid rgba(255, 182, 193, 0.3);
`;

const ContactIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const ContactText = styled.p`
  color: #8B4A9C;
  font-weight: 500;
  margin: 5px 0;
`;

export const About = () => {
  return (
    <AboutContainer>
      <ContentWrapper>
        <HeroSection>
          <MainTitle>About Our Store</MainTitle>
          <Subtitle>
            Welcome to our magical shopping wonderland! We're passionate about bringing you 
            the most adorable and high-quality products with a touch of cuteness in everything we do.
          </Subtitle>
        </HeroSection>

        <SectionGrid>
          <InfoCard>
            <CardIcon>🌸</CardIcon>
            <CardTitle>Our Mission</CardTitle>
            <CardContent>
              To create a delightful shopping experience that brings joy and happiness to our customers. 
              We believe shopping should be fun, easy, and filled with wonderful discoveries.
            </CardContent>
          </InfoCard>
          
          <InfoCard>
            <CardIcon>💖</CardIcon>
            <CardTitle>Our Values</CardTitle>
            <CardContent>
              Quality, cuteness, and customer satisfaction are at the heart of everything we do. 
              We carefully curate each product to ensure it meets our high standards of excellence.
            </CardContent>
          </InfoCard>
          
          <InfoCard>
            <CardIcon>✨</CardIcon>
            <CardTitle>Our Promise</CardTitle>
            <CardContent>
              We promise to deliver not just products, but experiences that make you smile. 
              From our adorable packaging to our friendly customer service, every detail matters.
            </CardContent>
          </InfoCard>
        </SectionGrid>

        <StatsSection>
          <SectionTitle>Our Achievements</SectionTitle>
          <StatsGrid>
            <StatItem>
              <StatNumber>10K+</StatNumber>
              <StatLabel>Happy Customers</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>500+</StatNumber>
              <StatLabel>Products</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>50+</StatNumber>
              <StatLabel>Countries</StatLabel>
            </StatItem>
            <StatItem>
              <StatNumber>5★</StatNumber>
              <StatLabel>Average Rating</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsSection>

        <TeamSection>
          <SectionTitle>Meet Our Team</SectionTitle>
          <TeamGrid>
            <TeamCard>
              <TeamAvatar>👑</TeamAvatar>
              <TeamName>Merin</TeamName>
              <TeamRole>Founder & CEO</TeamRole>
              <TeamDescription>
                Merin founded our store with a vision to make shopping a delightful experience. 
                She loves cute designs and customer happiness.
              </TeamDescription>
            </TeamCard>
            
            <TeamCard>
              <TeamAvatar>🎨</TeamAvatar>
              <TeamName>Kayla</TeamName>
              <TeamRole>Head of Design</TeamRole>
              <TeamDescription>
                Kayla brings our cute aesthetic to life. She's responsible for the adorable 
                designs that make our store so special.
              </TeamDescription>
            </TeamCard>
            
            <TeamCard>
              <TeamAvatar>💝</TeamAvatar>
              <TeamName>Melody</TeamName>
              <TeamRole>Customer Success</TeamRole>
              <TeamDescription>
                Melody ensures every customer has an amazing experience. She's always ready 
                to help with a smile and lots of care.
              </TeamDescription>
            </TeamCard>
          </TeamGrid>
        </TeamSection>

        <ContactSection>
          <SectionTitle>Get In Touch</SectionTitle>
          <Subtitle>We'd love to hear from you! Reach out anytime.</Subtitle>
          <ContactInfo>
            <ContactItem>
              <ContactIcon>📧</ContactIcon>
              <ContactText>hello@cutestore.com</ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>📱</ContactIcon>
              <ContactText>+1 (555) 123-CUTE</ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>📍</ContactIcon>
              <ContactText>123 Kawaii Street<br/>Cute City, CC 12345</ContactText>
            </ContactItem>
            <ContactItem>
              <ContactIcon>🕒</ContactIcon>
              <ContactText>Mon-Fri: 9AM-6PM<br/>Weekends: 10AM-4PM</ContactText>
            </ContactItem>
          </ContactInfo>
        </ContactSection>
      </ContentWrapper>
    </AboutContainer>
  );
};