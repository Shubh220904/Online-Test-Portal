import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useQuiz } from '../../context/QuizContext';
import Button from '../ui/Button';
import { AppLogo, StartIcon } from '../../config/icons';
import { PageCenter, CenterCardContainer, LogoContainer, HighlightedText } from '../../styles/Global';
import styled from 'styled-components';
import { ScreenTypes } from '../../types';

// Styled Components
const AppTitle = styled.h2`
  font-weight: 700;
  font-size: 32px;
  color: ${({ theme }) => theme.colors.themeColor};
`;

const DetailTextContainer = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  margin-bottom: 40px;
  text-align: center;
  max-width: 500px;
`;

const DetailText = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
`;

const DetailTextBlack = styled.p`
  font-size: 20px;
  font-weight: 500;
  margin-top: 15px;
  line-height: 1.3;
  color: black;
`;

const FormModal = styled.div`
  background: white;
  padding: 20px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

// Main Component
const QuizDetailsScreen = () => {
  const { setCurrentScreen, quizDetails } = useQuiz();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    amount: '1000',
    cardNumber: '',
    cvv: '',
    expDate: '',
  });
  const [errors, setErrors] = useState({});

  const { selectedQuizTopic, totalQuestions, totalScore, totalTime } = quizDetails;

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Phone number validation
    if (!formData.phone || formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be 10 digits.';
    }

    // Age validation
    if (!formData.age || parseInt(formData.age) < 18) {
      newErrors.age = 'You must be at least 18 years old.';
    }

    // Card details validation
    if (!formData.cardNumber || formData.cardNumber.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits.';
    }

    if (!formData.cvv || formData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits.';
    }

    const expDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    if (!formData.expDate || !expDateRegex.test(formData.expDate)) {
      newErrors.expDate = 'Enter a valid expiration date (MM/YY).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = () => {
    emailjs
      .send(
        'service_ia0hm0z', // Replace with your EmailJS Service ID
        'template_rto9r9a', // Replace with your EmailJS Template ID
        {
          user_name: formData.name,
          user_email: formData.email,
          quiz_topic: selectedQuizTopic,
          payment_amount: formData.amount,
          card_number: formData.cardNumber,
          exp_date: formData.expDate,
        },
        'PvRNmNXSbB_V-CGvV' // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log('Email sent successfully:', result.text);
          alert('Email sent successfully! Payment confirmed.');
        },
        (error) => {
          console.error('Error sending email:', error);
          alert('Failed to send email. Please try again.');
        }
      );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    localStorage.setItem('userDetails', JSON.stringify(formData));
    sendEmail();
    setIsFormOpen(false);
    setCurrentScreen(ScreenTypes.QuestionScreen);
  };

  return (
    <PageCenter light justifyCenter>
      <CenterCardContainer>
        <LogoContainer>
          <AppLogo />
        </LogoContainer>
        <AppTitle>XEVEN QUIZ</AppTitle>
        <DetailTextContainer>
          <DetailText>
            Selected Quiz Topic: <HighlightedText>{selectedQuizTopic}</HighlightedText>
          </DetailText>
          <DetailText>
            Total questions to attempt: <HighlightedText>{totalQuestions}</HighlightedText>
          </DetailText>
          <DetailText>
            Score in total: <HighlightedText>{totalScore}</HighlightedText>
          </DetailText>
          <DetailText>
            Total time: <HighlightedText>{totalTime}</HighlightedText>
          </DetailText>
          <DetailTextBlack>
            Amount to Pay: <HighlightedText>₹{formData.amount}</HighlightedText>
          </DetailTextBlack>
        </DetailTextContainer>
        <Button text="Start" icon={<StartIcon />} onClick={() => setIsFormOpen(true)} bold />
        {isFormOpen && (
          <FormModal>
            <h3>Please enter your details</h3>
            <form onSubmit={handleFormSubmit}>
              <Input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
              <Input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
              {errors.phone && <p style={{ color: 'red' }}>{errors.phone}</p>}
              <Input
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                required
              />
              {errors.age && <p style={{ color: 'red' }}>{errors.age}</p>}
              <Input
                type="text"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                required
              />
              {errors.cardNumber && <p style={{ color: 'red' }}>{errors.cardNumber}</p>}
              <Input
                type="text"
                placeholder="CVV"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                required
              />
              {errors.cvv && <p style={{ color: 'red' }}>{errors.cvv}</p>}
              <Input
                type="text"
                placeholder="Expiration Date (MM/YY)"
                value={formData.expDate}
                onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                required
              />
              {errors.expDate && <p style={{ color: 'red' }}>{errors.expDate}</p>}
              <DetailTextBlack>Amount to Pay: ₹{formData.amount}</DetailTextBlack>
              <ButtonContainer>
                <Button text="Pay" onClick={handleFormSubmit} bold />
                <Button text="Cancel" onClick={() => setIsFormOpen(false)} bold />
              </ButtonContainer>
            </form>
          </FormModal>
        )}
      </CenterCardContainer>
    </PageCenter>
  );
};

export default QuizDetailsScreen;
