import React, { Component } from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions/index';

class TaskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            isActive: 'true',
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.updateTask.id !== prevState.id) {
            return {
                id: nextProps.updateTask.id,
                name: nextProps.updateTask.name,
                isActive: nextProps.updateTask.isActive,
            }
        } else return null
    }

    closeModal = () => {
        this.setState({
            id: '',
            name: '',
            isActive: 'true',
        });
        this.props.onCloseModal();
        this.props.onGetUpdateTask({
            id: '',
            name: '',
            isActive: 'true',
        });
    }

    openModal = () => {
        this.props.onShowModal();
    }


    handleChange = (event) => {
        var name = event.target.name;
        var value = event.type === "checkbox" ? event.checked : event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let tempState = { ...this.state };
        if (tempState.isActive !== true && tempState.isActive !== false) {
            tempState.isActive = tempState.isActive === 'true' ? true : false;
        }
        if (this.state.id !== '') {
            this.props.onUpdateTask(tempState);
        } else this.props.onAddTask(tempState);
        this.closeModal();
    }

    onClear = () => {
        this.setState({
            id: '',
            name: '',
            isActive: 'true',
        });
    }



    render() {
        var { showModal } = this.props;

        return (
            <Modal show={showModal} onHide={this.closeModal}>
                <Modal.Header >
                    <Modal.Title>{this.state.id === '' ? 'Th??m C??ng Vi???c' : 'S???a C??ng Vi???c'}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group as={Row} controlId="name">
                            <Form.Label column sm={3}>T??n: </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    type="text"
                                    placeholder="T??n c??ng vi???c"
                                    value={this.state.name}
                                    name='name'
                                    onChange={this.handleChange} />
                            </Col>
                        </Form.Group>
                        <br />
                        <Form.Group as={Row} controlId="isActive">
                            <Form.Label column sm={3}>Tr???ng Th??i: </Form.Label>
                            <Col sm={9}>
                                <Form.Control
                                    as="select"
                                    name="isActive"
                                    value={this.state.isActive}
                                    onChange={this.handleChange}
                                >
                                    <option value={true}>K??ch Ho???t</option>
                                    <option value={false}>???n</option>
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <br />
                        <div style={{ textAlign: 'center' }}>
                            <Button variant="primary" type="submit" className='mx-2'>
                                Submit
                            </Button>
                            <Button variant="primary" type="button" className='mx-2' onClick={this.onClear}>
                                Reset
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        showModal: state.showModal,
        updateTask: state.updateTask,
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask: (task) => {
            dispatch(actions.addTask(task));
        },
        onShowModal: () => {
            dispatch(actions.showModal());
        },
        onCloseModal: () => {
            dispatch(actions.closeModal());
        },
        onGetUpdateTask: (task) => {
            dispatch(actions.getUpdateTask(task));
        },
        onUpdateTask: (task) => {
            dispatch(actions.updateTask(task));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskModal);