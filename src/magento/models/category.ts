export class MagentoCategory {
  id: string;
  parentId: string;
  name: string;
  isActive: string;
  level: number;
  productCount: number;
  childrenData: MagentoCategory[];

  constructor({
    id,
    parent_id,
    name,
    is_active,
    level,
    product_count,
    children_data,
    req,
  }: {
    id: string;
    parent_id: string;
    name: string;
    is_active: string;
    level: number;
    product_count: number;
    children_data: any[];
    req?: any;
  }) {
    this.id = id;
    this.parentId = parent_id;
    this.name = name;
    this.isActive = is_active;
    this.level = level;
    this.productCount = product_count;
    this.childrenData = children_data.map((child) => new MagentoCategory({ ...child, req }));
  }

  toRequestData = (req?: any): any => {
    return {
      id: this.id,
      parent_id: this.parentId,
      name: req ? req.t(this.name) : this.name,
      is_active: this.isActive,
      level: this.level,
      children_data: this.childrenData.map((child) => child.toRequestData(req)),
    };
  };
}
