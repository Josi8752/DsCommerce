import { useEffect, useState } from 'react';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import FormInput from '../../../components/FormInput';
import * as forms from '../../../utils/form';
import * as productService from '../../../services/product-service';

export default function ProductForm() {

    const params = useParams();
    const isEditing = params.productId !== 'create';
    const navigate = useNavigate();
    const [formData, setFormData] = useState<any>({

        name: {
            value: "",
            id: "name",
            name: "name",
            type: "text",
            placeholder: "Nome",
        },
        price: {
            value: "",
            id: "price",
            name: "price",
            type: "number",
            placeholder: "Preço",
        },
        imgUrl: {
            value: "",
            id: "imgUrl",
            name: "  imgUrl",
            type: "text",
            placeholder: "Imagem",
        }
    });

    useEffect(() => {
        if (isEditing) {
            productService.findById(Number(params.productId))
                .then(response => {
                    const newFormData = forms.updateAll(formData, response.data);
                    setFormData(newFormData);
                })
        }
    }, [])


    function handleCancelProduct() {
        navigate("/admin/products")
    }

    function handleInputChange(event: any) {

        const value = event.target.value;
        const name = event.target.name;
        setFormData(forms.update(formData, name, value));

    }


    return (
        <main>
            <section id="product-form-section" className="dsc-container">
                <div className="dsc-product-form-container">
                    <form className="dsc-card dsc-form">
                        <h2>Dados do produto</h2>
                        <div className="dsc-form-controls-container">
                            <div>
                                <FormInput className="dsc-form-control"
                                    {...formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormInput className="dsc-form-control"
                                    {...formData.price}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <FormInput className="dsc-form-control"
                                    {...formData.imgUrl}
                                    onChange={handleInputChange}
                                />
                            </div>

                        </div>

                        <div className="dsc-product-form-buttons">
                            <div onClick={handleCancelProduct}>
                                <button type="reset" className="dsc-btn dsc-btn-white">Cancelar</button>
                            </div>

                            <button type="submit" className="dsc-btn dsc-btn-blue">Salvar</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}