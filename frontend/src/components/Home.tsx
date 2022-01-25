import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
    })
);

function Home() {
    const classes = useStyles();

    return (
        <div>
            <Container className={classes.container} maxWidth="md">

                <h1 style={{ textAlign: "center" }}>ระบบบันทึกเวชระเบียน</h1>
                <h3>Requirements</h3>
                <h4>
                &nbsp;
                บลาๆๆๆๆๆๆๆๆๆๆๆๆๆๆ

                </h4>
            </Container>
        </div>
    );
}
export default Home;