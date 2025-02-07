import React, { useEffect, useState } from 'react'
import classes from './App.module.css'
import { AnimatePresence, motion, MotionConfig, useMotionValue } from "framer-motion";
import {
    Avatar,
    Dropdown, DropdownItem, DropdownMenu,
    DropdownTrigger,
    Link,
    useDisclosure,
    Button,
    Modal,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalBody,
} from "@nextui-org/react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import LoginPage from "./pages/LoginPage.jsx";
import WorkListPage from "./pages/WorkListPage.jsx";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ToastContainer, Zoom } from "react-toastify";

function App() {
    const [count, setCount] = useState(0)
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const items = [
        {
            key: "source",
            label: "github",
        },

        {
            key: "theme",
            label: "设置主题",
        },
        {
            key: "logout",
            label: "注销",
        },
    ];

    const location = useLocation();
    return (
        <>
            <div className='appRoot'>
                <div className={classes.topNav}>
                    <Link className={classes.navBtn} isBlock={true}>
                        首页
                    </Link>
                    <Link className={classes.navBtn} isBlock={true} href={'/list/1'}>
                        作业
                    </Link>
                    <Link className={classes.navBtn} isBlock={true}>
                        网盘
                    </Link>
                    <Link className={classes.navBtn} href={'/login'} isBlock={true}>
                        登录
                    </Link>

                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={1900}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    transition={Zoom}
                    pauseOnHover
                    theme="colored"
                />
                <ToastContainer />
                <div className={classes.avatarRoot}>
                    <Dropdown backdrop={"blur"}>
                        <DropdownTrigger>
                            <Avatar src={localStorage.getItem("avatar")} size="lg"
                                className={classes.avatar} />
                        </DropdownTrigger>
                        <DropdownMenu
                            aria-label="Dynamic Actions"
                            items={items}
                            onAction={key => {
                                switch (key) {
                                    case "source": {
                                        window.open('https://github.com/114514ns/dailyworkweb')
                                    }
                                    case "theme": {
                                        onOpen()
                                    }
                                }
                            }}
                        >
                            {(item) => (
                                <DropdownItem
                                    key={item.key}
                                    color={item.key === "logout" ? "danger" : "default"}
                                    className={item.key === "logout" ? "text-danger" : ""}
                                >
                                    {item.label}
                                </DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    <>
                        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                            <ModalContent>
                                {(onClose) => (
                                    <>
                                        <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                                        <ModalBody>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="danger" variant="light" onPress={onClose}>
                                                Close
                                            </Button>
                                            <Button color="primary" onPress={onClose}>
                                                Action
                                            </Button>
                                        </ModalFooter>
                                    </>
                                )}
                            </ModalContent>
                        </Modal>
                    </>
                </div>
                <div className={classes.content}

                >
                    <AnimatePresence mode={'wait'}>
                        <Routes key={location.pathname} location={location}>
                            <Route path={'/login'} element={<LoginPage />} />
                            <Route path={'/list/:id'} element={<WorkListPage />} />
                        </Routes>
                    </AnimatePresence>
                </div>

            </div>
        </>
    )

}

export default App
