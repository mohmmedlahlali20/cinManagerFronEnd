import {Button , Input} from '../UI/index.jsx'
function Addchair() {
    return (
        <div>
            <h1>Add a new chair</h1>
            <form>
                <Input type="text" placeholder="Chair name" />
                <Input type="text" placeholder="Chair color" />
                <Input type="number" placeholder="Chair price" />
                <Button>Add Chair</Button>
            </form>
            <Button onClick={() => history.push('/dashboardadmin')}>Back to dashboard</Button>
        </div>
    );
}

export default Addchair;