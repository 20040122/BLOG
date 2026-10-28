---
title: "NSGen"
summary: "利用领域特定语言生成工业软件测试用例"
date: "2025-12-01"
draft: false
tags:
- DSL
repoUrl: https://github.com/20040122/NSGen
---

NSGen 是一个面向计算机辅助工程（CAE）软件测试的模板化数值仿真测试用例生成框架，旨在解决不同 CAE 工具输入语法差异大、参数约束复杂、有效测试输入难以自动构造的问题。该项目通过设计通用的语法规则与语义规则描述 CAE 输入格式及参数之间的依赖、排斥和扩展等约束，并基于模板实例化自动生成合法的数值仿真输入，从而支持对 CAE 工具开展高效的自动化缺陷检测；仓库是论文 NSGen: A Template-Based Framework to Find Bugs in Computer-Aided Engineering Tools 的代码实现，该工作发表于 2026 IEEE Transactions on Software Engineering（TSE）。
