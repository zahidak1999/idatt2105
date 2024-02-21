package no.ntnu.idatt2105.calculatorapi.controller;

import no.ntnu.idatt2105.calculatorapi.model.CalculationResult;
import no.ntnu.idatt2105.calculatorapi.service.CalculatorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class CalculatorController {

    @Autowired
    private CalculatorService calculatorService;

    @PostMapping("/api/calculate/")
    public CalculationResult calculate(@RequestBody String expression) {
        System.out.println("Calculating: " + expression);
        double result;
        try {
            result = calculatorService.calculate(expression);
        } catch (Exception e) {
            throw new RuntimeException("Invalid expression");
        }
        CalculationResult calculation = new CalculationResult();
        calculation.setResult(result);
        calculation.setExpression(expression);
        return calculation;
    }

    @PostMapping("/api/calculateJSON/")
    public CalculationResult calculateJSON(@RequestBody String expression) {
        double result;
        try {
            result = calculatorService.calculate(expression);
        } catch (Exception e) {
            throw new RuntimeException("Invalid expression");
        }
        return new CalculationResult(expression, result);
    }
}