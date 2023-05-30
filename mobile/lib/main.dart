import 'package:flutter/material.dart';
import 'package:meublox/pages/CartPage.dart';
import 'package:meublox/pages/HomePage.dart';
import 'package:meublox/pages/ItemPage.dart';
import 'package:meublox/pages/SearchPage.dart';
import 'package:meublox/pages/FavoritePage.dart';

void main() => runApp(const MyApp());

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        scaffoldBackgroundColor: Colors.white,
      ),
      routes: {
        "/": (context) => const HomePage(),
        "cartPage":(context) => const CartPage(),
        "itemPage":(context) => const ItemPage(),
        "searchPage":(context) => const SearchPage(),
        "favoritePage":(context) => const FavoritePage(),
      },
    );
  }
}