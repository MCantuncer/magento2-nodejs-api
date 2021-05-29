export class MagentoProduct {
  id: string;
  sku: string;
  name: string;
  price: number;
  image?: string;
  description?: string;

  constructor({
    id,
    sku,
    name,
    price,
    custom_attributes,
  }: {
    id: string;
    sku: string;
    name: string;
    price: number;
    custom_attributes: any[];
  }) {
    this.id = id;
    this.sku = sku;
    this.name = name;
    this.price = price;

    const descriptionAttribute = custom_attributes.find((attribute) => attribute.attribute_code == 'description');
    this.description = descriptionAttribute ? descriptionAttribute.value : undefined;

    const imageAttribute = custom_attributes.find((attribute) => attribute.attribute_code == 'image');
    this.image = imageAttribute ? imageAttribute.value : undefined;
  }
}
