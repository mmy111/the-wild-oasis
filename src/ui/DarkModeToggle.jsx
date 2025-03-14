import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2"
import ButtonIcon from "./ButtonIcon"
import { useDrakMode } from "../features/context/DarkModeContext"

function DarkModeToggle() {
    const {isDarkMode,toggleDarkMode} = useDrakMode()
    return (
        <ButtonIcon onClick={toggleDarkMode}>
            {isDarkMode ? <HiOutlineSun/> :<HiOutlineMoon/>}
        </ButtonIcon>
    )
}

export default DarkModeToggle
