package no.ntnu.idatt2105.calculatorapi.service;

import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class CalculatorService {
    
    public double calculate(String equation) {
        System.out.println("Calculating: " + equation);
        Expression expression = new ExpressionBuilder(equation).build();
        return expression.evaluate();
    }
}