class Item {
  String? id;
  String nom;
  String description;
  double price;
  List<String>? imagePath;
  List<String>? couleurs;
  int stock;
  List<String>? categorie;
  int? note;

  Item({
    this.id,
    required this.nom,
    required this.description,
    required this.price,
    this.imagePath,
    this.couleurs,
    required this.stock,
    this.categorie,
    this.note,
  });

  factory Item.fromJson(Map<String, dynamic> json) {
    return Item(
      id: json['id'],
      nom: json['nom'],
      description: json['description'],
      price: json['prix'],
      imagePath: List<String>.from(json['images'] ?? []),
      couleurs: List<String>.from(json['couleurs'] ?? []),
      stock: json['stock'],
      categorie: List<String>.from(json['categorie'] ?? []),
      note: json['note'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'nom': nom,
      'description': description,
      'prix': price,
      'images': imagePath,
      'couleurs': couleurs,
      'stock': stock,
      'categorie': categorie,
      'note': note,
    };
  }
}