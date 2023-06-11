import 'package:flutter/material.dart';

class LoginTextField extends StatelessWidget {
  final controller;
  final String hintText;
  final bool obscureText;

  const LoginTextField({super.key, required this.controller, required this.hintText, required this.obscureText});

  @override
  Widget build(BuildContext context) {
    return TextField(
      controller: controller,
      obscureText: obscureText,
      decoration: InputDecoration(
        enabledBorder: const OutlineInputBorder(
            borderSide: BorderSide(color: Colors.white)),
        focusedBorder: OutlineInputBorder(
          borderSide: BorderSide(color: Colors.grey.shade400),
        ),
        fillColor: Colors.white,
        filled: true,
        hintText: hintText,
        hintStyle: TextStyle(color: Colors.grey[500]),
      ),
    );
  }
}
