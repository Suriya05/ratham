import { useState, useEffect } from "react";
import Header from "../../components/header/Header";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faRobot, faUser, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { startConversation, nameConversation, ageConversation } from "../../state";

const Chat = () => {
    const dispatch = useDispatch();
    const chat = useSelector((state) => state.chat.chat);
    const isChatActive = useSelector((state) => state.chat.isChatActive);
    const isNameSet = useSelector((state) => state.chat.isNameSet);
    const isAgeSet = useSelector((state) => state.chat.isAgeSet);

    const [userInput, setUserInput] = useState("");
    const [timeLeft, setTimeLeft] = useState(null);
    const [botCount, setBotCount] = useState(null);
    const isDetailsCollected = isChatActive && isNameSet && isAgeSet;
    const navigate = useNavigate();

    useEffect(() => {
        setBotCount(3);
    },[]);

    useEffect(() => {
        if(isChatActive){
            return setBotCount(3);
        }
        if(isAgeSet){
            return setBotCount(3);
        }
        if(isNameSet){
            return setBotCount(3);
        }
    },[isChatActive, isNameSet, isAgeSet]);

    useEffect(() => {
        if(botCount===0){
            setBotCount(null);
        }
        if (!botCount) return;

        const interval = setInterval(() => {
          setBotCount(botCount - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [botCount]);

    useEffect(() => {
        if(isDetailsCollected){
           setTimeLeft(5); 
        }
        
    }, [isDetailsCollected]);

    useEffect(() => {
        if(timeLeft===0){
            navigate("/dashboard");
            setTimeLeft(null);
        }
        if (!timeLeft) return;

        const interval = setInterval(() => {
          setTimeLeft(timeLeft - 1);
        }, 1000);
        return () => clearInterval(interval);

      }, [timeLeft]);

    const sendMessage = () => {
        console.log("sendConversation",userInput)
        if(isChatActive && !isNameSet){
            dispatch(
                nameConversation({
                    message: userInput
                })
            )
        }
        if(isChatActive && isNameSet && !isAgeSet){
            dispatch(
                ageConversation({
                    message: userInput
                })
            )
        }
        setUserInput("");
    };
    const activateConversation = () => {
        dispatch(
            startConversation({
              message: "Got it!"
            })
        );
    }

    return (
        <>
            <Header />
            <ChatContainer className="my-3">
                <BackButton as={Link} to={"/"}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                </BackButton>
                {!isChatActive ? 
                ( botCount && !isChatActive ? 
                    <BotMessageContainer>
                        <Avatar icon={faRobot} />
                        <BotMessage>...</BotMessage>
                    </BotMessageContainer> :

                    <BotMessageContainer>
                        <Avatar icon={faRobot} />
                        <BotMessage>Hello, Welcome to student info system!</BotMessage>
                        <ActivateButton 
                        onClick={async () => { activateConversation()}}
                        >Got it!</ActivateButton>
                    </BotMessageContainer>
                ):
                <>
                    {chat.initialConversation.length>0 && chat.initialConversation.map((initialChat, idx) => {
                        return initialChat.user === "bot" ? 
                        (
                        <BotMessageContainer key={`initialConversationBot`+ idx}>
                            <Avatar icon={faRobot} />
                            <BotMessage>{initialChat.message}</BotMessage>
                        </BotMessageContainer>                        
                        ): 

                        <PersonMessageContainer key={`initialConversationPerson`+ idx}>
                            <PersonMessage>{initialChat.message}</PersonMessage>
                            <Avatar icon={faUser} />
                        </PersonMessageContainer>
                    })
                    }

                   {chat.nameConversation.length>0 && chat.nameConversation.map((nameChat, idx) => {
                        return nameChat.user === "bot" ? 
                        (botCount && !isNameSet? 
                        <BotMessageContainer key={`chatConversationBot`+ idx}>
                            <Avatar icon={faRobot} />
                            <BotMessage>...</BotMessage>
                         </BotMessageContainer> :
                        <BotMessageContainer key={`chatConversationBot`+ idx}>
                            <Avatar icon={faRobot} />
                            <BotMessage>{nameChat.message}</BotMessage>
                        </BotMessageContainer>                         
                        ) : 

                        <PersonMessageContainer key={`chatConversationPerson`+ idx}>
                            <PersonMessage>{nameChat.message}</PersonMessage>
                            <Avatar icon={faUser} />
                        </PersonMessageContainer>
                    })
                    }

                    {isNameSet && chat.ageConversation.length>0 && chat.ageConversation.map((ageChat, idx) => {
                        return ageChat.user === "bot" ?
                        (botCount && !isAgeSet?
                        <BotMessageContainer key={`chatConversationBot`+ idx}>
                            <Avatar icon={faRobot} />
                            <BotMessage>...</BotMessage>
                        </BotMessageContainer> :
                        <BotMessageContainer key={`chatConversationBot`+ idx}>
                            <Avatar icon={faRobot} />
                            <BotMessage>{ageChat.message}</BotMessage>
                        </BotMessageContainer>
                        ): 

                        <PersonMessageContainer key={`chatConversationPerson`+ idx}>
                            <PersonMessage>{ageChat.message}</PersonMessage>
                            <Avatar icon={faUser} />
                        </PersonMessageContainer>
                    })
                    }

                    {isDetailsCollected ? 
                    <>
                        <BotMessageContainer key={`chatConversationBotCount`}>
                            <Avatar icon={faRobot} />
                            <BotMessage>Thank you. In {timeLeft} seconds, bot will exit</BotMessage>
                        </BotMessageContainer>
                    </> : null
                    }
                </>

                }               
            </ChatContainer>

            <SendContainer>
                <SendInput type="text" value={userInput} onChange={e => setUserInput(e.target.value)}></SendInput>
                <SendButton onClick={sendMessage}>
                    <SendIcon icon={faPaperPlane} />
                </SendButton>
            </SendContainer>
        </>
    )
}

export default Chat;
const Avatar = styled(FontAwesomeIcon)`
    display: inline;
    font-size: 15px;
    color: #ffffff;
    background-color: #03addc;
    border-radius: 50%;
    padding: 8px;
    width: 25px;
    height: 25px;
`;
const BotMessageContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 5px;
    margin: 10px 0;
`;
const PersonMessageContainer = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 5px;
    margin: 10px 0;
`;
const BotMessage = styled.div`
    display: inline;
    background-color: #f5f5f5;
    border-radius: 0 10px 10px 10px;
    padding: 5px 10px;
    margin: 10px;
`;
const PersonMessage = styled.div`
    display: inline;
    color: #ffffff;
    background-color: #03addc;
    border-radius: 10px 10px 0 10px;
    padding: 5px 10px;
    margin: 10px;
`;
const ChatContainer = styled(Container)`
    max-width: 992px;
    height: 90vh;
    border: 1px solid #f5f5f5;
    border-radius: 5px;
`;
const BackButton = styled.button`
    color: #000000;    
    background: none;
    border: none;
`; 

const SendContainer = styled(Container)`
    padding: 0;
    padding-bottom: 5px;
    display: flex;
    max-width: 992px;
`;

const SendInput = styled.input`
    width: 100%;
    padding: 5px;
    background-color: #fffefc;
    border: 0.5px solid #c5c6d0;
    border-radius: 5px;
    box-shadow: none;
    outline: none;
    &:focus{
       border: 0.5px solid #03addc; 
    }
`
const SendButton = styled.button`
    padding: 4px 8px;
    margin: 0 5px;
    background-color: #03addc;
    border: none;
    border-radius: 5px;
`;

const SendIcon = styled(FontAwesomeIcon)`
    font-size: 20px;
    color: #ffffff;
`;

const ActivateButton = styled.a`
    text-decoration: none;
    background-color: #fffefc;
    color: #03addc;
    border: 0.5px solid #c5c6d0;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
`;