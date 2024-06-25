import React from 'react'

const Result = ({userAnswers, questions, resetQuiz}) => {
const correctAnswers = userAnswers.filter((answer) => answer === true).length;
  return (
    <div className='results'>
        <h2>Results</h2>
        <p> You answered {correctAnswers} out of {questions.length}</p>
        <span onClick={resetQuiz}>Try Again</span>
        <ul>{
            questions.map((question, index) => {
                return (
                    <>
                    <li key={index} data-correct={userAnswers[index]}>
                        Q {index + 1}: {question.question}
                        
                    </li>
                    <li>
                        {!userAnswers[index] && (
                            <span style={{ color: "green" }}>
                            Correct Answer :{" "}
                            {question.answerOptions.map(
                                (el) => el.isCorrect == true && el.text
                            )}
                            </span>
                      )}
                    </li>
                    </>

                )
            })
}</ul>

    </div>
  )
}

export default Result