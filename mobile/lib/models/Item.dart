import 'package:flutter/material.dart';

// Création d'un modèle Item

class Item {
  final String title;
  final double price;
  final int quantity;

  const Item({
    required this.title,
    required this.price,
    required this.quantity,
  });
}