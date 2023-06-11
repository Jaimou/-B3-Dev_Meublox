import 'package:flutter/material.dart';

class LoginSignInButton extends StatelessWidget {

  final Function()? onTap;

  const LoginSignInButton({super.key, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.all(25),
        decoration: BoxDecoration(
          color: const Color.fromARGB(255, 80, 39, 118),
          borderRadius: BorderRadius.circular(10),
        ),
        child: const Center(
          child: Text(
            "Se connecter",
            style: TextStyle(
              color: Colors.white,
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
        )
      ),
    );
  }
}