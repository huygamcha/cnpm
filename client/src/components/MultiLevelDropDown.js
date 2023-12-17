import {useEffect} from "react";
import {Nav, NavDropdown} from "react-bootstrap";
import {DropdownSubmenu, NavDropdownMenu} from "react-bootstrap-submenu";
import {getAllBrands} from "../slices/brandSlice";
import {getAllCategories} from "../slices/categorySlice";
import {useSelector, useDispatch} from "react-redux";
import "react-bootstrap-submenu/dist/index.css";

const MultiLevelDropDown = () => {
    const {brands} = useSelector((state) => state.brands);
    const {categories} = useSelector((state) => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBrands());
        dispatch(getAllCategories());
    }, [dispatch]);

    const setSelectOptions = (opts, page) => {
        return opts.map((item) => (
            <NavDropdown.Item href={`/${page}/${item.slug}`}>
                {item.name}
            </NavDropdown.Item>
        ));
    };

    return (
        <Nav>
            <NavDropdownMenu title="Explore">
                <NavDropdown.Item href="/all">All Product</NavDropdown.Item>
                <DropdownSubmenu title="Brands" className="nav-hover">
                    {setSelectOptions(brands, "brand")}
                </DropdownSubmenu>
                <DropdownSubmenu title="Categories">
                    {setSelectOptions(categories, "category")}
                </DropdownSubmenu>
                <NavDropdown.Item href="/sale">
                    On Sale Products
                </NavDropdown.Item>
            </NavDropdownMenu>
        </Nav>
    );
};
export default MultiLevelDropDown;
