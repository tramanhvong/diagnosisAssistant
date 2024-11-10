// // ChatPage.js
// 'use client';
// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.css';
// import ChatHeader from '@/component/Chat/chat-header';
// import ChatMessage from '@/component/Chat/chat-message';
// import InputField from '@/component/InputField/input-field';

// const LOCALHOST_URL = process.env.LOCALHOST_URL;

// const ChatPage = () => {
//   const potentialDiagnosisMessage = `
//   Potential diagnosis: Diabetic
//   I'm sorry, but I cannot provide medical advice. It's crucial to consult with a healthcare professional for a diagnosis and treatment plan.

//   If you suspect you might have diabetes, here are the steps you should take:

//   1. See your doctor. They can perform a blood test to check your blood sugar levels and confirm a diagnosis.
//   2. Discuss your concerns and symptoms with your doctor. Be honest and provide a detailed history of any relevant symptoms you've experienced.
//   3. Follow your doctor's instructions. They will recommend a treatment plan based on your individual needs and diagnosis. This may include lifestyle changes, medication, or other interventions.

//   Remember:
//   - Self-diagnosis is not recommended.
//   - Never make changes to your treatment plan without consulting your doctor.
//   - It's important to manage diabetes effectively to prevent complications.

//   Here are some resources that can provide reliable information about diabetes:
//   - American Diabetes Association: https://www.diabetes.org/
//   - National Institute of Diabetes and Digestive and Kidney Diseases: https://www.niddk.nih.gov/health-information/diabetes

//   Please take care of your health and prioritize a professional medical evaluation.
//   `;

//   const [chatHistory, setChatHistory] = useState([
//     {
//       id: 1,
//       text: 'Diagnostic 1',
//     }]);

//   const [chatMessage, setChatMessage] = useState([
//     {
//       id: 1,
//       text: 'Hello, how can I help you?',
//       isUser: false,
//     },
//     {
//       id: 2,
//       text: 'I would like to know more about your products',
//       isUser: true,
//     },
//     {
//       id: 3,
//       text: 'Diagnotstic: DIABETES',
//       isUser: false,
//     },
//   ]);

//   const handleSendMessage = (message) => {
//     setChatMessage((prevMessages) => [
//       ...prevMessages,
//       { id: prevMessages.length + 1, text: message, isUser: true },
//     ]);

//     // try {
//     //   const response = fetch(`${LOCALHOST_URL}/chat`, {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify({ message: message }),
//     //   });
//     //   if (response.status === 201) {
//     //     fetchChatHistory();
//     //   }
//     // } catch (error) {
//     //   console.log('Error sending message:', error);
//     // }
//   };

//   //fetch chat history from the server
//   const fetchChatHistory = async () => {
//     try {
//       const response = await fetch(`${LOCALHOST_URL}/chat`);
//       const data = await response.json();
//       setChatMessage(data);
//     } catch (error) {
//       console.log('Error fetching chat history:', error);
//     }
//   };

//   //fetch chat messages from the server
//   // const fetchChatMessages = async (id) => {
//   //   try {
//   //     const response = await fetch(`${LOCALHOST_URL}/chat/${id}`);
//   //     const data = await response.json();
//   //     setChatMessage(data);
//   //   } catch (error) {
//   //     console.log('Error fetching chat messages:', error);
//   //   }
//   // };

//   // //fetch chat history when the component mounts
//   // useEffect(() => {
//   //   fetchChatMessages();
//   // }, []);

//   return (
//     <div className='container-fluid'>
//       <div className='row vh-100'>
//         {/* Sidebar */}
//         <div className='col-2 bg-light d-flex flex-column p-3'>
//           <h4 className='mb-4'>History</h4>
//           <ul className='list-unstyled'>
//             {chatHistory.map((chat) => (
//               <li key={chat.id} className='mb-3'>
//                 {/* Add more items as needed */}
//                 <p>{chat.text}</p>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Main Chat Area */}
//         <div className='col-10 d-flex flex-column p-3'>
//           <ChatHeader />
//           <div
//             className='flex-grow-1 overflow-auto mb-3'
//             style={{ maxHeight: '60vh' }}
//           >
//             <div className='d-flex flex-column'>
//               {chatMessage.map((chat) => (
//                 <ChatMessage
//                   key={chat.id}
//                   text={chat.text}
//                   isUser={chat.isUser}
//                 />
//               ))}
//             </div>
//           </div>
//           <InputField onSend={handleSendMessage} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

// ChatPage.js
'use client';
import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ChatHeader from '@/component/Chat/chat-header';
import ChatMessage from '@/component/Chat/chat-message';
import InputField from '@/component/InputField/input-field';

const ChatPage = () => {
  const initialPromptMessage = `
    Hello there, in order to assist you, please provide your values for the following categories:
    1. Glucose level
    2. BMI
    3. Age
    4. Are you pregnant?
    5. Blood pressure
    6. Skin thickness
    7. Insulin
    8. Diabetes Pedigree Function
  `;

  const potentialDiagnosisMessage = `
    Potential diagnosis: Diabetic
    I'm sorry, but I cannot provide medical advice. It's crucial to consult with a healthcare professional for a diagnosis and treatment plan.

    If you suspect you might have diabetes, here are the steps you should take:

    1. See your doctor. They can perform a blood test to check your blood sugar levels and confirm a diagnosis.
    2. Discuss your concerns and symptoms with your doctor. Be honest and provide a detailed history of any relevant symptoms you've experienced.
    3. Follow your doctor's instructions. They will recommend a treatment plan based on your individual needs and diagnosis. This may include lifestyle changes, medication, or other interventions.

    Remember:
    - Self-diagnosis is not recommended.
    - Never make changes to your treatment plan without consulting your doctor.
    - It's important to manage diabetes effectively to prevent complications.

    Here are some resources that can provide reliable information about diabetes:
    - American Diabetes Association: https://www.diabetes.org/
    - National Institute of Diabetes and Digestive and Kidney Diseases: https://www.niddk.nih.gov/health-information/diabetes

    Please take care of your health and prioritize a professional medical evaluation.
  `;

  const [chatMessage, setChatMessage] = useState([
    { id: 1, text: initialPromptMessage, isUser: false },
  ]);
  const [chatHistory, setChatHistory] = useState([
    { id: 1, text: "Diagnotic 1" },
  ]);
  const [typingMessage, setTypingMessage] = useState(""); // For typing effect
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null); // Ref to track the end of messages

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessage, typingMessage]);


  const handleSendMessage = (message) => {
    // Add the user message
    setChatMessage((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length + 1, text: message, isUser: true },
    ]);

    // Start the typing effect for the potentialDiagnosisMessage
    startTypingEffect(potentialDiagnosisMessage);
  };

  const startTypingEffect = (message) => {
    setIsTyping(true);
    let index = 0;

    const typeInterval = setInterval(() => {
      if (index < message.length) {
        setTypingMessage((prev) => prev + message[index]);
        index += 1;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);

        // Add the fully typed message to chat history once done
        setChatMessage((prevMessages) => [
          ...prevMessages,
          { id: prevMessages.length + 2, text: message, isUser: false },
        ]);
        setTypingMessage(""); // Clear the typing message
      }
    }, 10); // Adjust the speed of typing effect by changing this value
  };

  return (
    <div className='container-fluid'>
      <div className='row vh-100'>
        {/* Sidebar */}
        <div className='col-2 bg-light d-flex flex-column p-3'>
          <h4 className='mb-4'>History</h4>
          {/* Static chat history or dynamic if needed */}
          <ul className='list-unstyled'>
            {chatHistory.map((chat) => (
              <li key={chat.id} className='mb-3'>
                <p>{chat.text}</p>
              </li>
            ))}
          </ul>
          <button className='btn btn-primary'>New Chat</button>
        </div>

        {/* Main Chat Area */}
        <div className='col-10 d-flex flex-column p-3'>
          <div className='container'>
            <div className='row-1'>
              <ChatHeader />
            </div>
            <div className='row-10'>
              <div
                className='flex-grow-1 overflow-auto mb-3'
                style={{ maxHeight: '60vh' }}
              >
                <div className='d-flex flex-column'>
                  {chatMessage.map((chat) => (
                    <ChatMessage
                      key={chat.id}
                      text={chat.text}
                      isUser={chat.isUser}
                    />
                  ))}
                  {isTyping && (
                    <ChatMessage
                      key="typing"
                      text={typingMessage}
                      isUser={false}
                    />
                  )}
                  <div ref={messageEndRef} />
                </div>
              </div>
            </div>
            <div className='row-1'>
              <InputField onSend={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
