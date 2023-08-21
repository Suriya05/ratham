import Header from "../../components/header/Header"
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styled from "styled-components";

const Home = () => {

    return (
        <>
            <Header />
            <Container>
                <div className="py-3">
                    <h4>Enter into Student Info System</h4>
                    <Link to={"/chat"}>
                        <EnrollButton variant="secondary" >Enroll Now</EnrollButton>
                    </Link>
                </div>
            </Container>
        </>
    )
}

export default Home;

const EnrollButton = styled(Button)`
    color: #03addc;
    border: none;
    background-color: #000000;
    &:hover{
        color: #ffffff;
        background-color: #03addc;
    }
`;