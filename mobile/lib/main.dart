import 'package:flutter/material.dart';
import 'package:meublox/pages/CartPage.dart';
import 'package:meublox/pages/Homepage.dart';
import 'package:meublox/pages/ItemPage.dart';

void main() => runApp(MyApp());

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
        "/": (context) => HomePage(),
        "cartPage":(context) => CartPage(),
        "itemPage":(context) => ItemPage(),

      },
    );
  }
}