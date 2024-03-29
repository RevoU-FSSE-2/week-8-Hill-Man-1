"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_1 = __importDefault(require("./data"));
const router = express_1.default.Router();
let cashFlows = data_1.default;
router.get('/', (req, res) => {
    res.json("This is a Web About Cashflow");
});
router.get('/cashflow', (req, res) => {
    res.json({
        message: "Data Cashflow",
        data: cashFlows
    });
});
router.get('/cashflow/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cashflow = cashFlows.find((p) => p.id === id);
    if (cashflow) {
        res.json({
            message: "This Data Cashflow Get By ID",
            data: cashflow
        });
    }
    else {
        res.status(404).json({ message: 'Cashflow not found' });
    }
});
router.post('/cashflow', (req, res) => {
    const newCashflow = {
        id: cashFlows.length + 1,
        cashflow: req.body.cashflow,
        description: req.body.description,
        amount: req.body.amount,
        note: req.body.note,
    };
    cashFlows.push(newCashflow);
    res.status(200).json({
        message: "Added to Data Cashflow",
        data: newCashflow
    });
});
router.put('/cashflow/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cashFlowIndex = cashFlows.findIndex((p) => p.id === id);
    if (cashFlowIndex !== -1) {
        const updateCashFlow = {
            id,
            cashflow: req.body.cashflow,
            description: req.body.description,
            amount: req.body.amount,
            note: req.body.note,
        };
        cashFlows[cashFlowIndex] = updateCashFlow;
        res.json({ message: "Updated cashflow", data: updateCashFlow });
    }
    else {
        res.status(404).json({ message: "Cash Flow Not Found" });
    }
});
router.delete('/cashflow/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const cashFlowIndex = cashFlows.findIndex((p) => p.id === id);
    if (cashFlowIndex !== -1) {
        const deleteCashFlow = cashFlows.findIndex((p) => p.id === id);
        if (cashFlowIndex !== -1) {
            const deleteCashFlow = cashFlows.splice(cashFlowIndex, 1)[0];
            res.json({ message: "Deleted", data: deleteCashFlow });
        }
        else {
            res.status(404).json({ message: "Cash Flow Not Found" });
        }
    }
});
exports.default = router;
