import { FC } from "react";
import styled from "styled-components";
import { jsPDF } from "jspdf";

import { useQuiz } from "../../../context/QuizContext";
import { device } from "../../../styles/BreakPoints";
import { HighlightedText } from "../../../styles/Global";
import { convertSeconds } from "../../../utils/helpers";
import { Result } from "../../../types";

const ResultOverviewStyle = styled.div`
  text-align: center;
  margin-bottom: 70px;
  @media ${device.md} {
    margin-bottom: 30px;
  }
  p {
    margin-top: 15px;
    font-weight: 500;
    font-size: 18px;
  }
`;

const DownloadButton = styled.button`
  background-color: #333399;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;

  &:hover {
    background-color: #29297a;
  }
`;

interface ResultOverviewProps {
  result: Result[];
}

const ResultOverview: FC<ResultOverviewProps> = ({ result }) => {
  const { quizDetails, endTime } = useQuiz();

  const totalQuestionAttempted = result.length;

  const obtainedScore = result
    .filter((item) => item.isMatch && typeof item.score === "number")
    .reduce((accumulator, currentValue) => accumulator + (currentValue.score || 0), 0);

  const calculateStatus =
    (obtainedScore / quizDetails.totalScore) * 100 >= 60 ? "Passed" : "Failed";

  const generateStyledPDF = () => {
    const doc = new jsPDF();

    // Add Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor("#333399");
    doc.text("Quiz Results", 105, 20, { align: "center" });

    // Add quiz metadata
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text(`Quiz Topic: ${quizDetails.selectedQuizTopic}`, 20, 40);
    doc.text(`Total Questions: ${quizDetails.totalQuestions}`, 20, 50);
    doc.text(`Attempted Questions: ${totalQuestionAttempted}`, 20, 60);
    doc.text(
      `Score: ${obtainedScore}/${quizDetails.totalScore}`,
      20,
      70
    );
    doc.text(`Status: ${calculateStatus}`, 20, 80);
    doc.text(`Time Spent: ${convertSeconds(endTime)}`, 20, 90);

    // Save the PDF
    doc.save("Quiz_Results.pdf");
  };

  return (
    <ResultOverviewStyle>
      <p>
        You attempted questions:{" "}
        <HighlightedText> {totalQuestionAttempted} </HighlightedText>/{" "}
        {quizDetails.totalQuestions}
      </p>
      <p>
        Score secured:
        <HighlightedText> {obtainedScore} </HighlightedText>/{" "}
        {quizDetails.totalScore}
      </p>
      <p>
        Time Spent:<HighlightedText> {convertSeconds(endTime)} </HighlightedText>
      </p>
      <p>
        Status:<HighlightedText> {calculateStatus}</HighlightedText>
      </p>
      <DownloadButton onClick={generateStyledPDF}>
        Download PDF
      </DownloadButton>
    </ResultOverviewStyle>
  );
};

export default ResultOverview;
