import 'package:flutter/painting.dart';

class SpartanColor extends ColorSwatch<String> {
  const SpartanColor(int primary, Map<String, Color> swatch) : super(primary, swatch);
}

class SpartanColors {
  SpartanColors._();

  /// turquoise and swatches
  static const SpartanColor turquoise = SpartanColor(
    _turquoisePrimaryValue,
    <String, Color>{
      'light': Color(0xFF47CAF5),
      'dark': Color(0xFF007AA3),
      'lighter': Color(0xFF94E0F9),
      'base': Color(0xFF00B4F0),
      'darker': Color(0xFF00455C),
    },
  );
  static const int _turquoisePrimaryValue = 0xFF00B4F0;

  /// gold and swatches
  static const SpartanColor gold = SpartanColor(
    _goldPrimaryValue,
    <String, Color>{
      'lighter': Color(0xFFFEE2AA),
      'darker': Color(0xFFCC8100),
      'base': Color(0xFFFCBA36),
      'light': Color(0xFFFDD077),
      'dark': Color(0xFFFFAA00),
    },
  );
  static const int _goldPrimaryValue = 0xFFFCBA36;

  /// ice and swatches
  static const SpartanColor ice = SpartanColor(
    _icePrimaryValue,
    <String, Color>{
      'base': Color(0xFFF2F5F7),
    },
  );
  static const int _icePrimaryValue = 0xFFF2F5F7;

  /// green and swatches
  static const SpartanColor green = SpartanColor(
    _greenPrimaryValue,
    <String, Color>{
      'light': Color(0xFF19A953),
      'dark': Color(0xFF036329),
      'lighter': Color(0xFF29D66E),
      'darker': Color(0xFF013C19),
      'base': Color(0xFF06893A),
    },
  );
  static const int _greenPrimaryValue = 0xFF06893A;

  /// magenta and swatches
  static const SpartanColor magenta = SpartanColor(
    _magentaPrimaryValue,
    <String, Color>{
      'dark': Color(0xFF9E004F),
      'light': Color(0xFFFA61AD),
      'darker': Color(0xFF520029),
      'lighter': Color(0xFFFAB2D6),
      'base': Color(0xFFE60073),
    },
  );
  static const int _magentaPrimaryValue = 0xFFE60073;

  /// night and swatches
  static const SpartanColor night = SpartanColor(
    _nightPrimaryValue,
    <String, Color>{
      'lighter': Color(0xFF627A93),
      'base': Color(0xFF212B36),
      'lightest': Color(0xFF97A8BA),
      'dark': Color(0xFF0E1216),
      'light': Color(0xFF405468),
    },
  );
  static const int _nightPrimaryValue = 0xFF212B36;

  /// blue and swatches
  static const SpartanColor blue = SpartanColor(
    _bluePrimaryValue,
    <String, Color>{
      'lighter': Color(0xFF258AEF),
      'lightest': Color(0xFF64ADF7),
      'base': Color(0xFF004C99),
      'dark': Color(0xFF002447),
      'light': Color(0xFF006BD6),
    },
  );
  static const int _bluePrimaryValue = 0xFF004C99;

  /// grey and swatches
  static const SpartanColor grey = SpartanColor(
    _greyPrimaryValue,
    <String, Color>{
      'darker': Color(0xFF657586),
      'base': Color(0xFFB8C2CC),
      'light': Color(0xFFD6DBE1),
      'dark': Color(0xFF8B99A7),
      'lighter': Color(0xFFE7EBEE),
    },
  );
  static const int _greyPrimaryValue = 0xFFB8C2CC;

  /// red and swatches
  static const SpartanColor red = SpartanColor(
    _redPrimaryValue,
    <String, Color>{
      'base': Color(0xFFEA1010),
      'darker': Color(0xFF4C0505),
      'light': Color(0xFFF46666),
      'dark': Color(0xFF940A0A),
      'lighter': Color(0xFFFAB3B3),
    },
  );
  static const int _redPrimaryValue = 0xFFEA1010;

  /// white and swatches
  static const SpartanColor white = SpartanColor(
    _whitePrimaryValue,
    <String, Color>{
      'base': Color(0xFFFFFFFF),
    },
  );
  static const int _whitePrimaryValue = 0xFFFFFFFF;
}
