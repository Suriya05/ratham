import Header from "../../components/header/Header";
import { Container } from "react-bootstrap";
import styled from "styled-components";
import { useSelector } from "react-redux";



const Dashboard = () => {

    const name = useSelector(state => state.chat.userDetails.name);
    const age = useSelector(state => state.chat.userDetails.age);

    return (
        <>
        <Header/>
        <Container>
            <InfoBox>
                <Description>Your name <HighlightText>{name}</HighlightText> aged <HighlightText>{age}</HighlightText> has been added to student system. You may now exit.
                </Description>
            </InfoBox>
        </Container>
        
        </>
    )
}

export default Dashboard;

const InfoBox = styled.div`
    background: #2b3035;
    padding: 10px;
    margin: 10px;
    border-radius: 10px;
`;
const Description = styled.h4`
    color: #ffffff;
`;
const HighlightText = styled.span`
    color: #03addc;
`;