import { Field, Form, Formik } from "formik"
import s from "./SearchBar.module.css"

const SearchBar = ({onSubmit}) => {
    const handleSubmit = (values, options) => {
        const searchQuery = values.query.trim().toLowerCase();
        if (searchQuery === "") {
            alert("Nothing to search, please enter a query!");
            return;
        }
        onSubmit(searchQuery)
        options.resetForm();
    }

    const initialValues = {
        query: "",
    }

    return (
        <div>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form className={s.form}>
                    <Field name="query" placeholder="Movie search" className={s.field} />
                    <button type="submit" className={s.button}>Search</button>
                </Form>
            </Formik>
        </div>
    )
}

export default SearchBar