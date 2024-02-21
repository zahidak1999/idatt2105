package no.ntnu.idatt2105.calculatorapi.model;

public class CalculationResult {
    private String expression;
    private double result;

    public CalculationResult() {}

    public CalculationResult(String expression, double result) {
        this.expression = expression;
        this.result = result;
    }

    public String getExpression() {
        return expression;
    }

    public void setExpression(String expression) {
        this.expression = expression;
    }

    public double getResult() {
        return result;
    }

    public void setResult(double result) {
        this.result = result;
    }
}